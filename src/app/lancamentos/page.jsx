import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function ReleasesPage() {
  const releases = await prisma.event.findMany({
    where: { type: "Lançamento" },
    orderBy: { date: "asc" },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Calendário de Lançamentos</h1>

        {releases.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Ainda não há lançamentos agendados.</h3>
            <p>Aguardem novidades em breve!</p>
          </div>
        ) : (
          <div className={styles.timeline}>
            {releases.map((item) => {
              const dateObj = new Date(item.date);
              const monthYear = dateObj
                .toLocaleDateString("pt-BR", {
                  month: "short",
                  year: "numeric",
                })
                .replace(".", "");

              return (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.dateTextContainer}>
                    <div className={styles.dateTextDesktop}>{monthYear}</div>
                  </div>

                  {/* Mobile Marker */}
                  <div className={styles.dateMarker}></div>

                  <div className={styles.card}>
                    <span className={styles.mobileDate}>{monthYear}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                    <div className={styles.cardFooter}>
                      <span>Em breve nas livrarias</span>
                      <span className={styles.location}>{item.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
