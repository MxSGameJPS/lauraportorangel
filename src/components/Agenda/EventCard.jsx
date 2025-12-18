"use client";

import { useState } from "react";
import styles from "./EventCard.module.css";

export default function EventCard({ event }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", guests: 0, phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const month = dateObj
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");
  const time = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
        }),
      });

      if (res.ok) {
        alert("Presença confirmada! Nos vemos lá.");
        setIsModalOpen(false);
        setFormData({ name: "", guests: 0, phone: "" });
      } else {
        alert("Erro ao confirmar presença. Tente novamente.");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.dateBox}>
            <span className={styles.month}>{month}</span>
            <span className={styles.day}>{day}</span>
          </div>
          <span className={styles.badge}>{event.type || "Encontro"}</span>
        </div>

        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardDescription}>{event.description}</p>

        <div className="mt-auto">
          <p className={styles.infoRow}>
            <span className={styles.infoIcon}>📍</span> {event.location}
          </p>
          <p className={styles.infoRow}>
            <span className={styles.infoIcon}>⏰</span> {time}
          </p>
          <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
            Confirmar Presença
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Confirmar Presença</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <p className="mb-4 text-sm text-gray-600">
                  Para o evento <strong>{event.title}</strong>
                </p>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Seu Nome</label>
                  <input
                    type="text"
                    className={styles.input}
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Acompanhantes (opcional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={styles.input}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <small className="text-gray-500 text-xs">
                    Deixe 0 se for sozinho(a)
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    className={styles.input}
                    required
                    placeholder="(XX) 9XXXX-XXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.confirmBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
