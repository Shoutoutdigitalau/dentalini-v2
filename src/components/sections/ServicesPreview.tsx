import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getServicesFromJSON, Service } from "@/lib/services";

// Function to get related image based on service title/slug
const getServiceImage = (service: Service) => {
  const title = service.Title?.toLowerCase() || '';
  const slug = service.Slug?.toLowerCase() || '';
  
  if (title.includes('orthodontic') || slug.includes('orthodontic')) {
    return "/Website/Aligners 2.jpeg";
  }
  if (title.includes('implant') || slug.includes('implant')) {
    return "/images/dental implant.png";
  }
  if (title.includes('crown') || title.includes('bridge') || slug.includes('crown') || slug.includes('bridge')) {
    return "/Website/Crown & Bridge/Pt 1/After.JPG";
  }
  if (title.includes('hygiene') || title.includes('clean') || slug.includes('hygiene') || slug.includes('clean')) {
    return "/images/shutterstock_70216339.jpg";
  }
  if (title.includes('whitening') || title.includes('bleach') || slug.includes('whitening')) {
    return "/images/white.png";
  }
  if (title.includes('veneer') || slug.includes('veneer')) {
    return "/thumbnail_ComesticBanayanWebsitePic-1_1_.jpg";
  }
  if (title.includes('caries') || title.includes('filling') || slug.includes('caries') || slug.includes('filling')) {
    return "/Website/Caries/Pt 3/DSC_0020.JPG";
  }
  if (title.includes('infection') || title.includes('root canal') || slug.includes('infection') || slug.includes('endodontic')) {
    return "/Website/Infection/DSC_1865.JPG";
  }
  if (title.includes('invisible') || title.includes('aligner') || slug.includes('invisible') || slug.includes('aligner')) {
    return "/Website/Aligners 2.jpeg";
  }
  if (title.includes('tmj') || title.includes('disorder') || slug.includes('tmj') || slug.includes('disorder')) {
    return "/Website/BTX.png";
  }
  
  // Default fallback image
  return "/thumbnail_shutterstock_168128375.jpg";
};

export default function ServicesPreview() {
  const { data: services } = getServicesFromJSON();

  return (
    <div className="bg-[#E5F6FD80]">
      <section
        className="container mx-auto py-8 md:py-16 px-4"
        aria-labelledby="services-heading"
      >
        <h2
          id="services-heading"
          className="mb-2 text-center text-2xl md:text-3xl font-semibold text-primary"
        >
          Our Services
        </h2>
        <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-center text-sm md:text-base text-muted-foreground px-4">
          We combine expertise and empathy to deliver beautiful, healthy smiles.
        </p>
        <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services?.slice(0, 4).map((service: Service) => (
            <div key={service.id} className="p-3 md:p-4 bg-[#FFFFFF] shadow-lg rounded-[14px]">
              <div>
                <img
                  className="w-full aspect-video object-cover rounded-[10px]"
                  src={getServiceImage(service)}
                  alt={service.Title}
                />
              </div>

              <div className="mt-4 md:mt-[30px]">
                <h3 className="text-center text-lg md:text-2xl text-[#0B131E] font-semibold mb-2 md:mb-3 line-clamp-1">
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

        <div className="flex justify-center">
          <Button variant="hero" size="lg" className="mt-8 md:mt-12 w-full sm:w-auto" asChild>
            <Link href="/services">View all Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
