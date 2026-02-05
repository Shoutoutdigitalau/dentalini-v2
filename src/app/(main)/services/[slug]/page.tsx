import { notFound } from "next/navigation";
import { getServiceFromJSON, getServicesFromJSON } from "@/lib/services";
import SubHeader from "@/components/layout/SubHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Function to get before/after images for a service
const getBeforeAfterImages = (serviceSlug: string) => {
  const beforeAfterMap: { [key: string]: { before: string; after: string }[] } = {
    'crown-bridge': [
      { before: '/Website/Crown & Bridge/Pt 1/Before.JPG', after: '/Website/Crown & Bridge/Pt 1/After.JPG' }
    ],
    'orthodontics': [
      { before: '/Website/Orthodontics/Pt 2/Before.JPG', after: '/Website/Orthodontics/Pt 2/After.JPG' },
      { before: '/Website/Orthodontics/Pt 3/Before.JPG', after: '/Website/Orthodontics/Pt 3/After.JPG' }
    ],
    'dental-implants': [
      { before: '/Website/Implant/Single Implant cases/Pt 1/Before 2.JPG', after: '/Website/Implant/Single Implant cases/Pt 1/After 3.JPG' },
      { before: '/Website/Implant/Full arch cases/Pt 2/Before 1.JPG', after: '/Website/Implant/Full arch cases/Pt 2/After 1.JPG' }
    ],
    'cosmetic-dentistry': [
      { before: '/Website/Implant/Smile Make-Over/Pt 1/Before 1.JPG', after: '/Website/Implant/Smile Make-Over/Pt 1/After 1.JPG' },
      { before: '/Website/Implant/Smile Make-Over/Pt 2/Before 1.JPG', after: '/Website/Implant/Smile Make-Over/Pt 2/After 1.JPG' }
    ]
  };
  
  return beforeAfterMap[serviceSlug] || [];
};

// Function to get service thumbnail
const getServiceImage = (service: any) => {
  const title = service.Title?.toLowerCase() || '';
  const slug = service.Slug?.toLowerCase() || '';
  
  if (title.includes('cosmetic') || slug.includes('cosmetic')) return "/images/ComesticBanayanWebsitePic-1_1_.jpg";
  if (title.includes('orthodontic') || slug.includes('orthodontic')) return "/Website/Aligners 2.jpeg";
  if (title.includes('implant') || slug.includes('implant')) return "/images/dental implant.png";
  if (title.includes('crown') || title.includes('bridge')) return "/Website/Crown & Bridge/Pt 1/After.JPG";
  if (title.includes('hygiene') || title.includes('clean')) return "/images/shutterstock_70216339.jpg";
  if (title.includes('whitening')) return "/images/white.png";
  if (title.includes('emergency')) return "/tooth_aches.jpg";
  return "/thumbnail_shutterstock_168128375.jpg";
};

/**
 * Inline **bold** renderer
 */
const renderInlineBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const { data: services } = getServiceFromJSON(slug);
  const { data: allServices } = getServicesFromJSON();

  if (!services || services.length === 0) {
    notFound();
  }

  const service = services[0];
  const beforeAfterImages = getBeforeAfterImages(slug);
  const otherServices = allServices.filter(s => s.Slug !== slug).slice(0, 2);

  return (
    <div>
      <SubHeader title={service.Title} description="" />

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-gray-800">

            {service.Content.map((block: any, index: number) => {
              /* ---------------- PARAGRAPH ---------------- */
              if (block.type === "paragraph") {
                return (
                  <div key={index} className="mb-6">
                    {block.children.map((child: any, childIndex: number) => {
                      const text = child.text || "";

                      /* -------- BULLET POINTS -------- */
                      if (text.includes("•")) {
                        const lines = text.split("\n");

                        return (
                          <ul
                            key={childIndex}
                            className="list-disc list-inside space-y-2 pl-1"
                          >
                            {lines.map((line: string, lineIndex: number) => {
                              if (line.trim().startsWith("•")) {
                                return (
                                  <li
                                    key={lineIndex}
                                    className="text-base leading-7"
                                  >
                                    {renderInlineBold(
                                      line.replace("•", "").trim()
                                    )}
                                  </li>
                                );
                              }

                              if (line.trim()) {
                                return (
                                  <p
                                    key={lineIndex}
                                    className="text-base leading-7 mt-2"
                                  >
                                    {renderInlineBold(line.trim())}
                                  </p>
                                );
                              }

                              return null;
                            })}
                          </ul>
                        );
                      }

                      /* -------- NORMAL PARAGRAPH -------- */
                      return (
                        <p
                          key={childIndex}
                          className="text-base leading-7 mb-5"
                        >
                          {renderInlineBold(text)}
                        </p>
                      );
                    })}
                  </div>
                );
              }

              /* ---------------- IMAGE ---------------- */
              if (block.type === "image") {
                return (
                  <figure key={index} className="my-10">
                    <img
                      src={block.image.url}
                      alt={block.image.alternativeText || ""}
                      className="w-full rounded-xl shadow-md aspect-video"
                    />
                  </figure>
                );
              }

              return null;
            })}
          </div>

          {/* Teeth Whitening Images */}
          {slug === 'teeth-whitening' && (
            <div className="mt-8 mb-12">
              <div className="flex gap-6">
                <a href="">
                  <img 
                  src="/android.png" 
                  alt="Teeth Whitening Treatment"
                  className=" rounded-xl max-w-[150px] object-contain"
                />
                </a>
                <a href=""><img 
                  src="/apple.png" 
                  alt="Professional Teeth Whitening"
                  className="rounded-xl max-w-[150px] object-contain"
                /></a>
              </div>
            </div>
          )}

          {/* Before/After Images Section */}
          {beforeAfterImages.length > 0 && (
            <section className="mt-16 mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#0E2F80]">Before & After</h2>
                <Link href="/gallery">
                  <Button variant="outline" className="border-[#0091BA] text-[#0091BA] hover:bg-[#0091BA] hover:text-white">
                    Go to Gallery
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beforeAfterImages.slice(0, 2).map((images, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img 
                          src={images.before} 
                          alt="Before treatment"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          Before
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={images.after} 
                          alt="After treatment"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                          After
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* More Services Section */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#0E2F80]">More Services</h2>
              <Link href="/services">
                <Button variant="outline" className="border-[#0091BA] text-[#0091BA] hover:bg-[#0091BA] hover:text-white">
                  View More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherServices.map((otherService) => (
                <Link key={otherService.id} href={`/services/${otherService.Slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getServiceImage(otherService)} 
                        alt={otherService.Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#0E2F80] mb-2 group-hover:text-[#0091BA] transition-colors">
                        {otherService.Title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {otherService.description}
                      </p>
                      <div className="flex items-center mt-4 text-[#0091BA] group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
