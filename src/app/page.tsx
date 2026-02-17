import { MOCK_SUMMARIES } from "./constants/mockData";
import NavHeader from "./_components/NavHeader/NavHeader";
import HeroSection from "./_components/HeroSection/HeroSection";
import BookLibrary from "./_components/BookLibrary/BookLibrary";
import styles from "./page.module.css";

export const metadata = {
  title: "DragunWF Book Summaries",
};

export default function Home() {
  return (
    <div className={styles.appBackground}>
      <div className="container">
        <NavHeader />

        <HeroSection />

        <main>
          <BookLibrary bookSummaries={MOCK_SUMMARIES} />
        </main>

        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} DragunWF. Built with React,
            TypeScript, & Next.js
          </p>
        </footer>
      </div>
    </div>
  );
}
