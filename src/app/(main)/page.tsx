import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AffiliationSlider from "@/components/sections/AffiliationSlider";
import FloatingChatbot from "@/components/FloatingChatbot";
import dbConnect from "@/lib/mongodb";
import Affiliation from "@/models/Affiliation";
import Banner from "@/models/Banner";
import AboutSection from "@/models/AboutSection";

export const revalidate = 60;

async function getData() {
  await dbConnect();
  const [affiliations, banners, about] = await Promise.all([
    Affiliation.find({}).sort({ order: 1 }).lean(),
    Banner.find({ published: true }).sort({ order: 1 }).lean(),
    AboutSection.findOne().lean()
  ]);
  return JSON.parse(JSON.stringify({ affiliations, banners, about }));
}

export default async function Home() {
  const { affiliations, banners, about } = await getData();

  return (
    <div>
      <Hero banners={banners} />
      <main>
        <AboutPreview about={about} />
        <ServicesPreview />
        <AffiliationSlider affiliations={affiliations} />
        <ReviewsPreview />
      </main>
      <FloatingChatbot />
    </div>
  );
}
