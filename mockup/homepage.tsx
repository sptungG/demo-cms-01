"use client";
import CallToActionSection from "@/components/blocks/home/CallToActionSectionSecond";
import CertificationsSection from "@/components/blocks/home/CertificationsSection";
import DeepExportServices from "@/components/blocks/home/DeepExportServices";
import HeroSectionSecond from "@/components/blocks/home/HeroSectionSecond";
import KeyExportProducts from "@/components/blocks/home/KeyExportProducts";
import PartnersShowcase from "@/components/blocks/home/PartnersShowcase";
import WhoWeAreSection from "@/components/blocks/home/WhoWeAreSection";
import QuoteModal from "@/components/blocks/QuoteModal";
import SupplierModal from "@/components/blocks/SupplierModal";
import React, { useState } from "react";

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
      <DeepExportServices />
      <PartnersShowcase />
      <CertificationsSection />
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
