"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function ManageAgenda() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Encontro", // Default
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine date and time
      const datetime = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        title: formData.title,
        description: formData.description,
        date: datetime.toISOString(),
        location: formData.location,
        type: formData.type,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Evento agendado com sucesso!");
        router.push("/agenda");
      } else {
        alert("Erro ao agendar evento.");
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
      <h1 className={styles.title}>Agendar Compromisso</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título do Evento</label>
          <input
            type="text"
            className={styles.input}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Ex: Tarde de Autógrafos"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tipo de Evento</label>
          <select
            className={styles.select}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Encontro">Encontro / Café</option>
            <option value="Lançamento">Lançamento de Livro</option>
            <option value="Palestra">Palestra / Workshop</option>
            <option value="Feira">Feira Literária</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição</label>
          <textarea
            className={styles.textarea}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            placeholder="Detalhes sobre o evento..."
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Data</label>
            <input
              type="date"
              className={styles.input}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Horário</label>
            <input
              type="time"
              className={styles.input}
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Local</label>
          <input
            type="text"
            className={styles.input}
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            placeholder="Ex: Livraria da Vila - Fradique"
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Agendando..." : "Confirmar Evento"}
        </button>
      </form>
    </div>
  );
}
