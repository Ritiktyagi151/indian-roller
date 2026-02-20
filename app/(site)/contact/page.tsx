import type { Metadata } from "next";
import ContactClient from "../../../components/contact/ContactClient"; // Path check kar lein

// SEO Metadata
export const metadata: Metadata = {
  title: "Contact Indian Roller – Global Manufacturing & Service Support",
  description: "Get in touch with Indian Roller (IRI). Contact our units in Sahibabad, Jamshedpur, Ahmedabad, Bangladesh, and Ballari for high-quality rubber and PU rollers.",
  keywords: "Contact Indian Roller, Industrial Roller Support, Rubber Roller Service, IRI Units, Sahibabad Industrial Area, Manufacturing Support India",
  alternates: {
    canonical: "https://www.indianroller.com/contact", // Apni actual domain yahan dalein
  },
};

export default function ContactPage() {
  return <ContactClient />;
}