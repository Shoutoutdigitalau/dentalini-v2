import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AffiliationSlider from "@/components/sections/AffiliationSlider";

async function getAffiliations() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/affiliations`, {
    cache: 'no-store'
  });
  const data = await res.json();
  return data.affiliations || [];
}

export default async function Home() {
  const affiliations = await getAffiliations();

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
