"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
// To reuse styles, we can just copy them to page.module.css inside this folder or reference
// For simplicity, assuming user might have issues with relative paths in css modules if structure changes,
// I'll update the logic to just work.
import styles from "../../page.module.css";

export default function EditEvent({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Encontro",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Evento não encontrado");
          router.push("/admin/dashboard/agenda");
          return;
        }

        const dateObj = new Date(data.date);
        const dateStr = dateObj.toISOString().split("T")[0];
        const timeStr = dateObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setFormData({
          title: data.title,
          description: data.description,
          date: dateStr,
          time: timeStr,
          location: data.location,
          type: data.type,
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
      const datetime = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        title: formData.title,
        description: formData.description,
        date: datetime.toISOString(),
        location: formData.location,
        type: formData.type,
      };

      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Evento atualizado com sucesso!");
        router.push("/admin/dashboard/agenda");
      } else {
        alert("Erro ao atualizar evento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Evento</h1>

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

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Atualizar Evento"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/agenda")}
            style={{
              padding: "1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              background: "white",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
