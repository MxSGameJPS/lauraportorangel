import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Laura Porto Rangel
        <span>ESCRITORA</span>
      </Link>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Início
        </Link>
        <Link href="/livros" className={styles.navLink}>
          Livros
        </Link>
        <Link href="/lancamentos" className={styles.navLink}>
          Lançamentos
        </Link>
        <Link href="/agenda" className={styles.navLink}>
          Agenda
        </Link>
      </nav>

      <button className={styles.mobileButton} aria-label="Menu">
        ☰
      </button>
    </header>
  );
}
