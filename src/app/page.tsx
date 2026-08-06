import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Music from "@/components/sections/Music";
import Recognition from "@/components/sections/Recognition";
import Artist from "@/components/sections/Artist";
import Press from "@/components/sections/Press";
import Support from "@/components/sections/Support";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Nav />
      <Hero />
      <Manifesto />
      <Music />
      <Recognition />
      <Artist />
      <Press />
      <Support />
      <Contact />
      <Footer />
    </div>
  );
}
