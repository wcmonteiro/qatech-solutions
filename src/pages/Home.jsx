import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import BlogSection from "@/components/landing/BlogSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#0A0F1C] min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <div id="sobre">
        <AboutSection />
      </div>
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
}