import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AffiliationSlider from "@/components/sections/AffiliationSlider";
import Image from "next/image";

const affiliations = [
  {
    id: 1,
    name: "Australian Academy of Dento-Facial Aesthetics",
    logo: "/affiliations/aadfa-logo.png",
    url: "https://www.aadfa.org.au"
  },
  {
    id: 2,
    name: "Australian Dental Association",
    logo: "/affiliations/ada_logo_blue-2eff46.png",
    url: "https://www.ada.org.au"
  },
  {
    id: 3,
    name: "Australasian Osseointegration Society (AOS)",
    logo: "/affiliations/AOSlogo.jpg",
    url: "https://aos.org.au"
  },
  {
    id: 4,
    name: "HICAPS",
    logo: "/affiliations/hicaps-logo.png",
    url: "https://www.hicaps.com.au"
  },

  {
    id: 6,
    name: "Praktika",
    logo: "/affiliations/practika.png",
    url: "https://www.praktika.com.au"
  },
  {
    id: 7,
    name: "Total Lifestyle Credit (TLC)",
    logo: "/affiliations/tlc.png",
    url: "https://tlc.com.au"
  },
  {
    id: 8,
    name: "CBHS Health Fund",
    logo: "/affiliations/rebrand-logo.svg",
    url: "https://www.cbhs.com.au"
  },
  {
    id: 9,
    name: "Smile.com.au",
    logo: "/affiliations/smile.webp",
    url: "https://www.smile.com.au"
  },
  {
    id: 10,
    name: "Health Engine",
    logo: "/affiliations/healthengine.png",
    url: "https://www.healthengine.com.au"
  },
  {
    id: 11,
    name: "SuperCare",
    logo: "/affiliations/SuperCare-Superannuation-Access-logo.png",
    url: "https://www.mysupercare.com.au"
  }
];

export default function Home() {
  return (
    <div>
      <Hero />
      <main>
        <AboutPreview />
        <ServicesPreview />
        <AffiliationSlider affiliations={affiliations} />
        <ReviewsPreview />
      </main>
    </div>
  );
}
