import { prisma } from "@/lib/db";
import Image from "next/image";
import styles from "./page.module.css";

// Helper to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const revalidate = 0; // Disable static caching so updates show immediately

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { releaseDate: "desc" },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Loja de Livros</h1>
        <p className={styles.description}>
          Adquira minhas obras diretamente comigo. Ao selecionar um livro, você
          será redirecionado para o WhatsApp para finalizar a compra com
          segurança e carinho.
        </p>

        {books.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Nenhum livro disponível no momento.</h3>
            <p>Voltem em breve para conferir as novidades!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {books.map((book) => (
              <div key={book.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className={styles.bookCover}
                    />
                  ) : (
                    <div className={styles.noCover}>Sem Capa</div>
                  )}
                </div>

                <h3 className={styles.cardTitle}>{book.title}</h3>
                <p className={styles.cardDescription}>{book.description}</p>

                <div className={styles.footer}>
                  <span className={styles.price}>
                    {book.price ? formatPrice(book.price) : "Consulte"}
                  </span>

                  {/* Standardized WhatsApp Link Logic */}
                  {(() => {
                    // Logic: If admin provided a full URL (e.g. Amazon), use it.
                    // Otherwise, generate standardized WhatsApp link.
                    // If purchaseLink is just a number or empty, use default.

                    const phoneNumber = "5511999999999"; // TODO: Move to .env or settings
                    const message = `Ola Laura gostaria de saber mais sobre o Livro ${book.title} e como faço para adquirir o meu.`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;

                    // Use DB link if it's a completely different URL (like amazon.com),
                    // but if it's empty or looks like a phone, enforce the standard message.
                    const finalUrl =
                      book.purchaseLink &&
                      book.purchaseLink.startsWith("http") &&
                      !book.purchaseLink.includes("wa.me")
                        ? book.purchaseLink
                        : whatsappUrl;

                    return (
                      <a
                        href={finalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btn}
                      >
                        Comprar
                      </a>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
