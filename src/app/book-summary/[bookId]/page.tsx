import BookSummaryDetailPrototype from "@/app/_components/prototypes/BookSummaryDetailPrototype";

export const metadata = {
  // TODO: Change this to the real title dynamically
  title: "[Book Title] | Book Summary",
};

export default function Page() {
  return (
    <div>
      <BookSummaryDetailPrototype />
    </div>
  );
}
