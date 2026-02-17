import Background from "@/app/_components/AdminLogin/Background/Background";
import AdminLoginForm from "@/app/_components/AdminLogin/AdminLoginForm";
import Link from "next/link";
import { XCircle } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "Admin Login",
};

export default function Page() {
  return (
    <div className={styles.obsidianWrapper}>
      <Background />
      <AdminLoginForm />
      
      <div className={styles.bottomNav}>
        <Link href="/" className={styles.abortBtn}>
          <XCircle size={18} />
          Abort Protocol
        </Link>
      </div>
    </div>
  );
}
