import type { Metadata } from "next";
import CareerClient from "../../../components/career/CareerClient"; // Path check kar lein

// SEO Metadata for Career Page
export const metadata: Metadata = {
  title: "Careers at Indian Roller – Join Our Engineering Team",
  description: "Explore career opportunities at Indian Roller (IRI). We are looking for Rubber Technologists, CNC Operators, and Engineers to join our ISO certified manufacturing units.",
  keywords: "Indian Roller Careers, Job Vacancy Sahibabad, Engineering Jobs Jamshedpur, Rubber Technologist Jobs, CNC Operator Vacancy, Industrial Manufacturing Careers India",
  alternates: {
    canonical: "https://www.indianroller.com/career", // Apni actual domain yahan dalein
  },
};

export default function CareerPage() {
  return <CareerClient />;
}