import BookSummaryView from "@/app/_components/BookSummary/BookSummaryView";

export const metadata = {
  // TODO: Change this to the real title dynamically
  title: "[Book Title] | Book Summary",
};

export default function Page() {
  return (
    <div>
      <BookSummaryView />
    </div>
  );
}