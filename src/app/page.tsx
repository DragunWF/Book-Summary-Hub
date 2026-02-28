import NavHeader from "./_components/NavHeader/NavHeader";
import HeroSection from "./_components/HeroSection/HeroSection";
import BookLibrary from "./_components/BookLibrary/BookLibrary";
import styles from "./page.module.css";
import { getBookSummaries } from "./_lib/data-service";
import { MOCK_SUMMARIES } from "./constants/mockData";

export const metadata = {
  title: "DragunWF Book Summaries",
};

export default async function Home() {
  const bookSummaries = await getBookSummaries();

  return (
    <div className={styles.appBackground}>
      <div className="container" style={{ minHeight: "100vh" }}>
        <NavHeader />

        <HeroSection featuredBook={MOCK_SUMMARIES[0]} />

        <main>
          <BookLibrary bookSummaries={bookSummaries} />
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
