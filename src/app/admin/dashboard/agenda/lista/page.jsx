import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function RSVPList() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      guests: true, // Fetch guests for each event
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Presença</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">Nenhum evento cadastrado.</p>
      ) : (
        events.map((event) => {
          const totalConfirmed = event.guests.reduce(
            (acc, curr) => acc + 1 + curr.companions,
            0
          );

          return (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <span className="text-sm text-gray-500">
                    {event.location} - {event.type}
                  </span>
                </div>
                <div className={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString("pt-BR")}
                </div>
              </div>

              {event.guests.length === 0 ? (
                <div className={styles.emptyMsg}>
                  Nenhuma confirmação ainda.
                </div>
              ) : (
                <table className={styles.tableFull}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Acompanhantes</th>
                      <th>Total</th>
                      <th>Contato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.guests.map((guest) => (
                      <tr key={guest.id}>
                        <td>{guest.name}</td>
                        <td>{guest.companions}</td>
                        <td>{1 + guest.companions}</td>
                        <td>{guest.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {event.guests.length > 0 && (
                <div className={styles.totalGuests}>
                  Total de Pessoas Confirmadas: {totalConfirmed}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
