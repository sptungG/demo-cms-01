"use client";
import React, { useState } from "react";
import HeroSectionSecond from "./components/HeroSectionSecond";
import WhoWeAreSection from "./components/WhoWeAreSection";
import CallToActionSection from "./components/CallToActionSection";
import QuoteModal from "./components/QuoteModal";
import SupplierModal from "./components/SupplierModal";
import KeyExportProducts from "./components/KeyExportProducts";

const HomePage = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  return (
    <div className="container mx-auto relative overflow-hidden">
      <HeroSectionSecond
        onQuoteClick={() => setIsQuoteModalOpen(true)}
        onSupplierClick={() => setIsSupplierModalOpen(true)}
      />

      <WhoWeAreSection />
      <KeyExportProducts />

      <CallToActionSection
        onQuoteClick={() => setIsQuoteModalOpen(true)}
        onSupplierClick={() => setIsSupplierModalOpen(true)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />

      <SupplierModal
        isOpen={isSupplierModalOpen}
        onOpenChange={setIsSupplierModalOpen}
      />
    </div>
  );
};

export default HomePage;
