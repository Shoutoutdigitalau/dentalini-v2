import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AffiliationSlider from "@/components/sections/AffiliationSlider";
import dbConnect from "@/lib/mongodb";
import Affiliation from "@/models/Affiliation";

async function getAffiliations() {
  await dbConnect();
  const affiliations = await Affiliation.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(affiliations));
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
