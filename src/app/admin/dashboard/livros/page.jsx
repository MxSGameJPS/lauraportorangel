"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ManageBooks() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    releaseDate: new Date().toISOString().split("T")[0],
    coverImage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Livro cadastrado com sucesso!");
        router.push("/livros"); // Redirect to books page to see result
      } else {
        alert("Erro ao cadastrar livro.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastrar Novo Livro</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título da Obra</label>
          <input
            type="text"
            className={styles.input}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Ex: O Segredo do Vale"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Capa do Livro</label>
          <CldUploadWidget
            uploadPreset="livraria_preset" // We might need to create an unsigned preset in Cloudinary dashboard if 'ml_default' doesn't work
            // Ideally instruction: "Go to Cloudinary Settings > Upload > Upload presets > Add upload preset > Signing Mode: Unsigned > Name: livraria_preset"
            // For now, let's try standard unsigned if exists or guide user.
            // Let's assume standard interaction first.
            onSuccess={(result) => {
              setFormData({ ...formData, coverImage: result.info.secure_url });
            }}
          >
            {({ open }) => (
              <div className={styles.fileInputWrapper} onClick={() => open()}>
                {formData.coverImage
                  ? "Trocar Imagem"
                  : "Clique para enviar a imagem da capa"}
              </div>
            )}
          </CldUploadWidget>
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Preview"
              className={styles.preview}
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Sinopse / Descrição</label>
          <textarea
            className={styles.textarea}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            placeholder="Uma breve descrição da história..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={styles.formGroup}>
            <label className={styles.label}>Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              className={styles.input}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="0.00"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Data de Lançamento</label>
            <input
              type="date"
              className={styles.input}
              value={formData.releaseDate}
              onChange={(e) =>
                setFormData({ ...formData, releaseDate: e.target.value })
              }
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Cadastrar Livro"}
        </button>
      </form>
    </div>
  );
}
