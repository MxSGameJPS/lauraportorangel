"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminNavigation.module.css";

export default function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.brandName}>Painel Laura</h2>
          <p className={styles.version}>Versão 1.0</p>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/admin/dashboard"
            className={`${styles.navLink} ${
              pathname === "/admin/dashboard" ? styles.activeLink : ""
            }`}
            onClick={closeSidebar}
          >
            📊 Visão Geral
          </Link>
          <Link
            href="/admin/dashboard/livros"
            className={`${styles.navLink} ${
              pathname.includes("/livros") ? styles.activeLink : ""
            }`}
            onClick={closeSidebar}
          >
            📚 Gerenciar Livros
          </Link>
          <Link
            href="/admin/dashboard/agenda"
            className={`${styles.navLink} ${
              pathname.includes("/agenda") && !pathname.includes("lista")
                ? styles.activeLink
                : ""
            }`}
            onClick={closeSidebar}
          >
            🗓️ Gerenciar Agenda
          </Link>
          <Link
            href="/admin/dashboard/agenda/lista"
            className={`${styles.navLink} ${
              pathname.includes("/agenda/lista") ? styles.activeLink : ""
            }`}
            onClick={closeSidebar}
          >
            📋 Lista de Presença
          </Link>

          <Link href="/" target="_blank" className={styles.siteLink}>
            🌐 Ver Site
          </Link>
        </nav>

        <div className={styles.footer}>
          <form action="/api/auth/logout" method="POST">
            <button className={styles.logoutBtn} type="submit">
              Sair do Sistema
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
