import Link from "next/link";
import { prisma } from "@/lib/db";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function Dashboard() {
  // Fetch counts for quick stats
  const bookCount = await prisma.book.count();
  const eventCount = await prisma.event.count({
    where: { date: { gte: new Date() } },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Bem-vinda, Laura!</h1>
      </div>

      <div className={styles.statsGrid}>
        {/* Stat Card 1 */}
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Livros Cadastrados</h3>
          <p className={`${styles.statValue} ${styles.statValuePrimary}`}>
            {bookCount}
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Eventos Futuros</h3>
          <p className={`${styles.statValue} ${styles.statValueSecondary}`}>
            {eventCount}
          </p>
        </div>
      </div>

      <div className={styles.shortcutsGrid}>
        <Link
          href="/admin/dashboard/livros"
          className={`${styles.shortcutCard} ${styles.shortcutCardPrimary}`}
        >
          <div className={`${styles.iconCircle} ${styles.iconCirclePrimary}`}>
            📚
          </div>
          <h2 className={styles.shortcutTitle}>Gerenciar Livros</h2>
          <p className={styles.shortcutDesc}>
            Adicionar novos livros, editar preços e links de compra.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/agenda"
          className={`${styles.shortcutCard} ${styles.shortcutCardSecondary}`}
        >
          <div className={`${styles.iconCircle} ${styles.iconCircleSecondary}`}>
            🗓️
          </div>
          <h2 className={styles.shortcutTitle}>Gerenciar Agenda</h2>
          <p className={styles.shortcutDesc}>
            Criar lançamentos, marcar encontros e atualizar locais.
          </p>
        </Link>
      </div>
    </div>
  );
}
