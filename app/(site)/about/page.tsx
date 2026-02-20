import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero"; // Path check kar lein
import AboutDetails from "@/components/about/AboutDetails";
import WhyIRI from "@/components/about/WhyIRI";
import Philosophy from "@/components/about/Philosophy";
import ContactMirror from "@/components/about/ContactMirror";

export const metadata: Metadata = {
  title: "About Indian Roller – ISO Certified Industrial Roller Manufacturer",
  description: "Learn about Indian Roller, an ISO 9001:2008 certified industrial roller manufacturer offering premium rubber & polyurethane rollers.",
  keywords: "Indian Roller Industries, IRI, Rubber Roller Manufacturer, Polyurethane Manufacturing",
};

export default function AboutPage() {
  return (
    <main>
      {/* Banner Section */}
      <AboutHero 
        title="About Our Company" 
        subtitle="Sincere Service & Honest Manufacturing Since 1990" 
        imagePath="/about-img/about-bg.jpg" // Apni image ka sahi path yahan dalein
      />

      <AboutDetails />
      <WhyIRI />
      <Philosophy />
      <ContactMirror />
    </main>
  );
}