import { prisma } from "@/lib/db";
import EventCard from "@/components/Agenda/EventCard";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function AgendaPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Agenda & Encontros</h1>
        <p className={styles.subtitle}>
          Venha tomar um café literário, discutir obras e compartilhar
          experiências.
        </p>

        {events.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Nenhum evento agendado no momento.</h3>
            <p>Acompanhe minhas redes sociais para novidades.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
