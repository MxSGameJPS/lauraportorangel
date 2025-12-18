import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./layout.module.css";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  return (
    <div className={styles.container}>
      {/* Admin Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.brandName}>Painel Laura</h2>
          <p className={styles.version}>Versão 1.0</p>
        </div>

        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={styles.navLink}>
            📊 Visão Geral
          </Link>
          <Link href="/admin/dashboard/livros" className={styles.navLink}>
            📚 Gerenciar Livros
          </Link>
          <Link href="/admin/dashboard/agenda" className={styles.navLink}>
            🗓️ Gerenciar Agenda
          </Link>
          <Link href="/admin/dashboard/agenda/lista" className={styles.navLink}>
            📋 Lista de Presença
          </Link>

          <Link href="/" target="_blank" className={styles.siteLink}>
            🌐 Ver Site
          </Link>
        </nav>

        <div className={styles.footer}>
          <form action="/api/auth/logout" method="POST">
            <button className={styles.logoutBtn}>Sair do Sistema</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
