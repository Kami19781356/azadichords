import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Music from "@/components/sections/Music";
import Artists from "@/components/sections/Artists";
import Activity from "@/components/sections/Activity";
import Press from "@/components/sections/Press";
import Services from "@/components/sections/Services";
import Submissions from "@/components/sections/Submissions";
import Support from "@/components/sections/Support";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Music />
      <Artists />
      <Activity />
      <Press />
      <Services />
      <Submissions />
      <Support />
      <Contact />
    </>
  );
}
