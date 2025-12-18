import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import styles from "./list.module.css";
import DeleteButton from "./DeleteButton"; // Client component for delete action

export const revalidate = 0;

export default async function BooksList() {
  const books = await prisma.book.findMany({
    orderBy: { releaseDate: "desc" },
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciar Livros</h1>
        <Link href="/admin/dashboard/livros/novo" className={styles.addBtn}>
          + Novo Livro
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhum livro cadastrado. Clique em "+ Novo Livro" para começar.
        </div>
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <div key={book.id} className={styles.itemCard}>
              <div className={styles.itemInfo}>
                <div className={styles.thumbWrapper}>
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className={styles.thumbImage}
                    />
                  ) : (
                    <div className={styles.noThumb}>Sem Foto</div>
                  )}
                </div>
                <div className={styles.itemDetails}>
                  <h3>{book.title}</h3>
                  <p className={styles.itemMeta}>
                    {new Date(book.releaseDate).toLocaleDateString("pt-BR")} •{" "}
                    {book.price
                      ? `R$ ${parseFloat(book.price)
                          .toFixed(2)
                          .replace(".", ",")}`
                      : "Preço sob consulta"}
                  </p>
                </div>
              </div>

              <div className={styles.actions}>
                <Link
                  href={`/admin/dashboard/livros/editar/${book.id}`}
                  className={styles.editBtn}
                >
                  Editar
                </Link>
                <DeleteButton id={book.id} type="book" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
