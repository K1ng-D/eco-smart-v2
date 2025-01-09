import TransitionLayout from "@/components/transtition";
import AboutPage from "@/pages/home/aboutview";
import BeritaKamiSection from "@/pages/home/beritaview";
import FAQView from "@/pages/home/FAQView";
import HomePage from "@/pages/home/homeview";
import ProdukKamiSection from "@/pages/home/produkview";
import VisiMisiPage from "@/pages/home/visimisi";
import WedoPage from "@/pages/home/wedo";
import React from "react";

export default function page() {
  return (
    <div>
      <TransitionLayout />
      <HomePage />
      <AboutPage />
      <WedoPage />
      <VisiMisiPage />
      <ProdukKamiSection />
      <BeritaKamiSection />
      <FAQView />
    </div>
  );
}
