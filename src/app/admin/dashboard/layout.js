import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./layout.module.css";
import AdminNavigation from "./AdminNavigation";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  return (
    <div className={styles.container}>
      {/* Admin Sidebar & Mobile Toggle */}
      <AdminNavigation />

      {/* Main Content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
