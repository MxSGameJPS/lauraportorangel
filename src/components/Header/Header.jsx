"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Laura Porto Rangel
        <span>PSICOPEDAGOGA E ESCRITORA</span>
      </Link>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <Link
          href="/"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Início
        </Link>
        <Link
          href="/livros"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Livros
        </Link>
        <Link
          href="/lancamentos"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Lançamentos
        </Link>
        <Link
          href="/agenda"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Agenda
        </Link>
      </nav>

      <button
        className={styles.mobileButton}
        aria-label="Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}
