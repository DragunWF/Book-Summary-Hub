import Background from "@/app/_components/AdminLogin/Background/Background";
import AdminLoginForm from "@/app/_components/AdminLogin/AdminLoginForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Admin Login",
};

export default function Page() {
  return (
    <div className={styles.obsidianWrapper}>
      <Background />
      <AdminLoginForm />
    </div>
  );
}
