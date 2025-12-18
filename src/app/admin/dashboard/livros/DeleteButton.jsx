"use client";

import { useRouter } from "next/navigation";
import styles from "./list.module.css";

export default function DeleteButton({ id, type }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "Tem certeza que deseja excluir? Esta ação não pode ser desfeita."
      )
    )
      return;

    try {
      const endpoint =
        type === "book" ? `/api/books/${id}` : `/api/events/${id}`;
      const res = await fetch(endpoint, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh(); // Refresh server components
      } else {
        alert("Erro ao excluir.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir.");
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteBtn}>
      Excluir
    </button>
  );
}
