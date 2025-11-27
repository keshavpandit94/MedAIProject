import React from "react";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import { HowItWorks } from "../components/HowItWorks";
import { WhoThisIsFor } from "../components/WhoThisIsFor";
import { OurPromise } from "../components/OurPromise";
import { Footer } from "../components/Footer";
import data from "../data/whatwedo.json";

export default function Home() {
  
  // Define a reusable responsive padding class for standard sections
  const sectionPaddingClass = "py-16 px-4 sm:px-6";

  return (
    <div
      className="min-h-screen"
      style={{
        color: "#EAEFEF",
      }}
    >
      {/* Hero Section - Typically uses custom full-screen height/padding, 
        so we'll keep its container clean.
      */}
      <section>
          <Hero />
      </section>

      {/* What We Do Section - Applied standard responsive padding */}
      <section className={sectionPaddingClass}>
          <WhatWeDo items={data} />
      </section>

      {/* How It Works Section - Applied standard responsive padding */}
      <section className={sectionPaddingClass}>
          <HowItWorks />
      </section>

      {/* Who This Is For Section - Applied standard responsive padding */}
      <section className={sectionPaddingClass}>
          <WhoThisIsFor />
      </section>

      {/* Our Promise Section - Applied standard responsive padding */}
      <section className={sectionPaddingClass}>
          <OurPromise />
      </section>

      {/* Footer - Footer component handles its own layout/padding */}
      <Footer />
    </div>
  );
}