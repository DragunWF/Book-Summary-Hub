import HomePagePrototype from "./_components/prototypes/HomePagePrototype/HomePagePrototype";
import { MOCK_SUMMARIES } from "./constants/mockData";

export const metadata = {
  title: "DragunWF Book Summaries",
};

export default function Page() {
  return (
    <div>
      <HomePagePrototype bookSummaries={MOCK_SUMMARIES} />
    </div>
  );
}
