import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import Hero from "@/components/Hero/Hero";
import EventCard from "@/components/Agenda/EventCard";
import styles from "./page.module.css";

export const revalidate = 0;

export default async function Home() {
  const books = await prisma.book.findMany({
    take: 3,
    orderBy: { releaseDate: "desc" },
  });

  const events = await prisma.event.findMany({
    take: 3,
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });

  return (
    <main>
      <Hero />

      {/* Books Section */}
      <section className={styles.section} id="livros">
        <h2 className={styles.sectionTitle}>Obras em Destaque</h2>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum livro cadastrado ainda.
          </p>
        ) : (
          <div className={styles.grid}>
            {books.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <div className={styles.bookCoverWrapper}>
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className={styles.bookCover}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sem Capa
                    </div>
                  )}
                </div>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookDesc}>{book.description}</p>
                <Link href="/livros" className={styles.btnLink}>
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        )}

        {books.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/livros"
              className="text-[var(--primary)] font-bold hover:underline"
            >
              Ver todos os livros →
            </Link>
          </div>
        )}
      </section>

      {/* Agenda Section */}
      <section
        className={`${styles.section} ${styles.agendaSection}`}
        id="agenda"
      >
        <h2 className={styles.sectionTitle}>Próximos Encontros</h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum evento agendado para os próximos dias.
          </p>
        ) : (
          <div className={styles.grid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {events.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/agenda"
              className="text-[var(--primary)] font-bold hover:underline"
            >
              Ver agenda completa →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
