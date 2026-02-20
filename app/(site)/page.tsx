import Hero from "../../components/Hero";
import AboutSection from "../../components/AboutSection";
import Advantages from "../../components/Advantages";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Insights from "@/components/Insights";
import ScrollExperience from "@/components/ScrollExperience";
import UnitsSection from "@/components/Units";
import WhyChooseUs from "@/components/WhyChooseUs";

import BlogSlider from "@/components/BlogSlider";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Advantages />
      <Projects/>
      <Partners/>
      <Insights/>
      {/* <ScrollExperience/> */}
      <UnitsSection/>
      <WhyChooseUs/>
      <BlogSlider/>
    </main>
  );
}