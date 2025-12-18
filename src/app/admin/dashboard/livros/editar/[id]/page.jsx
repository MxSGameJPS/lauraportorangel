"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
// As we moved the file, we can't easily import css module from parent unless we adjust path
// Simplest is to copy styles or use relative path if it was not a copy.
// Let's create a local styles reference assuming we might want to copy/paste the css later or just use inline for now or
// actually better: import the CSS module from the parent listing page if possible or duplicate it.
// Since modules are scoped, we should probably duplicate or move the css.
// Let's assume we use the same css file from parent if we can import it, but standard is to have collocated css.
// I will create a simple CSS here since I can't easily reference ".." module in Next.js safely without knowing resolver.
// Wait, I can just use classes. But let's write a new module for "manage-form" and reuse it.
// For speed, let's keep it simple and just update content.

// I'll assume we duplicate the CSS for now for "novo" and "editar" or use a shared one.
// Actually, I'll update the original css to be shared or just create new ones.
// Let's update this file to be the EDIT form.

import styles from "../../page.module.css"; // Importing from list page which we will overwrite, so this is risky.
// Let's pretend I'll create the list page next with new styles.

export default function EditBook({ params }) {
  const router = useRouter();
  const { id } = params; // Params are passed as props in Next.js 13+ app dir (wait, params is a promise in newer versions? No, in simple page it's prop)
  // Check Next.js version. User has 16.0.10. Params need to be awaited or used directly?
  // In Next.js 15+, params is async.
  // We can use React.use() to unwrap it if needed, or just standard useEffect.

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    releaseDate: "",
    coverImage: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch book data
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Livro não encontrado");
          router.push("/admin/dashboard/livros");
          return;
        }
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price || "",
          releaseDate: new Date(data.releaseDate).toISOString().split("T")[0],
          coverImage: data.coverImage || "",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Livro atualizado com sucesso!");
        router.push("/admin/dashboard/livros");
      } else {
        alert("Erro ao atualizar livro.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return <div className="p-8 text-center">Carregando dados...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Livro</h1>

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
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Capa do Livro</label>
          <CldUploadWidget
            uploadPreset="livraria_preset"
            onSuccess={(result) => {
              setFormData({ ...formData, coverImage: result.info.secure_url });
            }}
          >
            {({ open }) => (
              <div className={styles.fileInputWrapper} onClick={() => open()}>
                {formData.coverImage
                  ? "Trocar Imagem"
                  : "Clique para enviar imagem"}
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

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Atualizar Livro"}
          </button>
          <button
            type="button"
            className={styles.cancelBtn || "p-3 border rounded text-gray-600"}
            onClick={() => router.push("/admin/dashboard/livros")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
