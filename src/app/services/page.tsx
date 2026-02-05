import SubHeader from "@/components/layout/SubHeader";
import { getServicesFromJSON, Service } from "@/lib/services";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Function to get related image based on service title/slug
const getServiceImage = (service: Service) => {
  const title = service.Title?.toLowerCase() || "";
  const slug = service.Slug?.toLowerCase() || "";

  if (title.includes("cosmetic") || slug.includes("cosmetic")) {
    return "/images/ComesticBanayanWebsitePic-1_1_.jpg";
  }
  if (title.includes("orthodontic") || slug.includes("orthodontic")) {
    return "/Website/Aligners 2.jpeg";
  }
  if (title.includes("implant") || slug.includes("implant")) {
    return "/images/dental implant.png";
  }
  if (
    title.includes("crown") ||
    title.includes("bridge") ||
    slug.includes("crown") ||
    slug.includes("bridge")
  ) {
    return "/images/Crown and Bridge.png";
  }
  if (
    title.includes("hygiene") ||
    title.includes("clean") ||
    slug.includes("hygiene") ||
    slug.includes("clean")
  ) {
    return "/images/shutterstock_70216339.jpg";
  }
  if (
    title.includes("whitening") ||
    title.includes("bleach") ||
    slug.includes("whitening")
  ) {
    return "/images/white.png";
  }
  if (title.includes("veneer") || slug.includes("veneer")) {
    return "/images/Veneers.png";
  }
  if (
    title.includes("caries") ||
    title.includes("filling") ||
    slug.includes("caries") ||
    slug.includes("filling")
  ) {
    return "/Website/Caries/Pt 3/DSC_0020.JPG";
  }
  if (
    title.includes("infection") ||
    title.includes("root canal") ||
    slug.includes("infection") ||
    slug.includes("endodontic")
  ) {
    return "/images/Root Canal Treatment.png";
  }
  if (title.includes("emergency") || slug.includes("emergency")) {
    return "/images/tooth_aches.jpg";
  }
  if (
    title.includes("invisible") ||
    title.includes("aligner") ||
    slug.includes("invisible") ||
    slug.includes("aligner")
  ) {
    return "/Website/Aligners 2.jpeg";
  }
  if (
    title.includes("tmj") ||
    title.includes("disorder") ||
    slug.includes("tmj") ||
    slug.includes("disorder")
  ) {
    return "/images/TMJ Disorder.png";
  }
  if (title.includes("night guard") || slug.includes("night-guard")) {
    return "/images/Night Guards.png";
  }

  if (title.includes("denture") || slug.includes("denture")) {
    return "/images/Dentures.png";
  }

  if (title.includes("extraction") || slug.includes("extraction")) {
    return "/images/Extractions.png";
  }

  if (title.includes("mouth") || slug.includes("guard")) {
    return "/images/Mouthguards.png";
  }
  if (title.includes("gum disease") || slug.includes("gum-disease")) {
    return "/images/Gum Disease.png";
  }

  if (title.includes("Wisdom") || slug.includes("wisdom-teeth")) {
    return "/images/Wisdom Teeth Extraction.png";
  }

  if (title.includes('inlay') || slug.includes('inlay')) {
    return "/images/Inlays.png";
  }
  // Default fallback image
  return "/thumbnail_shutterstock_168128375.jpg";
};

export default function Services() {
  const { data: services } = getServicesFromJSON();
  console.log(services);

  return (
    <div>
      <SubHeader
        title="Our Services"
        description="From routine care to cosmetic enhancements, we tailor treatments to your comfort and goals."
      />
      <section className="container mx-auto py-8 md:py-20 px-4">
        {services?.length > 0 ? (
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service: Service) => (
              <div
                key={service.id}
                className="p-3 md:p-4 bg-[#FFFFFF] shadow-lg rounded-[14px]"
              >
                <div>
                  <img
                    className="w-full aspect-video object-cover rounded-[10px]"
                    src={getServiceImage(service)}
                    alt={service.Title}
                  />
                </div>

                <div className="mt-4 md:mt-[30px]">
                  <h3 className="text-center text-lg md:text-2xl line-clamp-1 text-[#0B131E] font-semibold mb-2 md:mb-3">
                    {service.Title}
                  </h3>
                  <p className="text-center text-sm md:text-base text-[#0B131E] font-normal mb-3 md:mb-5 line-clamp-2">
                    {service.description?.slice(0, 100)}...
                  </p>
                  <div className="flex justify-center">
                    <Link
                      className="font-medium text-center flex gap-2 justify-center text-sm md:text-base pb-1 text-[#0E2F80] border-[#0E2F80]"
                      href={`/services/${service.Slug}`}
                    >
                      Learn more <ArrowRight className="w-3 md:w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">No services found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
