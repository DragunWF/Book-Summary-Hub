import NavHeader from "./_components/NavHeader/NavHeader";
import HeroSection from "./_components/HeroSection/HeroSection";
import BookLibrary from "./_components/BookLibrary/BookLibrary";
import styles from "./page.module.css";
import { getBookSummaries, getFeaturedBookSummary } from "./_lib/data-service";

export const metadata = {
  title: "DragunWF Book Summaries",
};

export default async function Home() {
  const bookSummaries = await getBookSummaries();
  const featuredBookSummary = await getFeaturedBookSummary();

  return (
    <div className={styles.appBackground}>
      <div className="container" style={{ minHeight: "100vh" }}>
        <NavHeader />

        <HeroSection featuredBook={featuredBookSummary} />

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
