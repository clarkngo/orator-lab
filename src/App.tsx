import { CaseStudyPreview } from "./components/CaseStudyPreview";
import { Footer } from "./components/Footer";
import { FourPillars } from "./components/FourPillars";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pipeline } from "./components/Pipeline";
import { Workspace } from "./components/Workspace";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pipeline />
        <FourPillars />
        <CaseStudyPreview />
        <Workspace />
      </main>
      <Footer />
    </>
  );
}
