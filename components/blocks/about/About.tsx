"use client";

import React from "react";
import { HeroAboutSection } from "./sections/HeroAboutSection";
import { TimelineSection } from "./sections/TimelineSection";
import { VisionMissionSection } from "./sections/VisionMissionSection";
import { LeadershipSection } from "./sections/LeadershipSection";
import { CapacitySection } from "./sections/CapacitySection";
import { LegalInfoSection } from "./sections/LegalInfoSection";
import { mockData } from "./mockData";

export const About = () => {
  return (
    <div className="min-h-screen">
      <HeroAboutSection data={mockData.blocks[0] as any} />
      <TimelineSection data={mockData.blocks[1] as any} />
      <VisionMissionSection data={mockData.blocks[2] as any} />
      <LeadershipSection data={mockData.blocks[3] as any} />
      <CapacitySection data={mockData.blocks[4] as any} />
      <LegalInfoSection data={mockData.blocks[5] as any} />
    </div>
  );
};
