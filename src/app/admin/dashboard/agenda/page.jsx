import Link from "next/link";
import { prisma } from "@/lib/db";
import styles from "./list.module.css";
import DeleteButton from "./DeleteButton";

export const revalidate = 0;

export default async function EventsList() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciar Agenda</h1>
        <Link href="/admin/dashboard/agenda/novo" className={styles.addBtn}>
          + Novo Evento
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhum evento agendado. Clique em "+ Novo Evento" para começar.
        </div>
      ) : (
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} className={styles.itemCard}>
              <div className={styles.itemInfo}>
                <div
                  className={styles.dateBox}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    background: "var(--accent)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                >
                  <span style={{ fontSize: "0.8rem" }}>
                    {new Date(event.date).getDate()}
                  </span>
                  <span style={{ fontSize: "0.7rem" }}>
                    {new Date(event.date)
                      .toLocaleDateString("pt-BR", { month: "short" })
                      .toUpperCase()
                      .replace(".", "")}
                  </span>
                </div>
                <div className={styles.itemDetails}>
                  <h3>{event.title}</h3>
                  <p className={styles.itemMeta}>
                    {new Date(event.date).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {event.location} •{" "}
                    <span className="text-[var(--primary)]">{event.type}</span>
                  </p>
                </div>
              </div>

              <div className={styles.actions}>
                <Link
                  href={`/admin/dashboard/agenda/editar/${event.id}`}
                  className={styles.editBtn}
                >
                  Editar
                </Link>
                <DeleteButton id={event.id} type="event" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
