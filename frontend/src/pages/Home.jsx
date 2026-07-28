import Hero from "../components/home/Hero";
import About from "../components/home/About";
import SelectedWork from "../components/home/SelectedWork";
import QuoteSection from "../components/home/QuoteSection";
import Services from "../components/home/Services";
import Contact from "../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <QuoteSection />
      <About />
      <Services />
      <Contact />
    </>
  );
}