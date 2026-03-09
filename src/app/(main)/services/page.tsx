import SubHeader from "@/components/layout/SubHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Dental Services | Dentalini",
  description: "From routine care to cosmetic enhancements, we tailor treatments to your comfort and goals. Explore our comprehensive dental services.",
  keywords: "dental services, dentist, dental care, cosmetic dentistry, dental implants, teeth whitening, orthodontics",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Services() {
  await dbConnect();
  const services = await Service.find({}).sort({ createdAt: 1 }).lean();

  return (
    <div>
      <SubHeader
        title="Our Services"
        description="From routine care to cosmetic enhancements, we tailor treatments to your comfort and goals."
      />
      <section className="container mx-auto py-8 md:py-20 px-4">
        {services?.length > 0 ? (
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service: any) => (
              <div
                key={service._id.toString()}
                className="p-3 md:p-4 bg-[#FFFFFF] shadow-lg rounded-[14px]"
              >
                <div>
                  <img
                    className="w-full aspect-video object-cover rounded-[10px]"
                    src={service.image || "/thumbnail_shutterstock_168128375.jpg"}
                    alt={service.title}
                  />
                </div>

                <div className="mt-4 md:mt-[30px]">
                  <h3 className="text-center text-lg md:text-2xl line-clamp-1 text-[#0B131E] font-semibold mb-2 md:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-center text-sm md:text-base text-[#0B131E] font-normal mb-3 md:mb-5 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      className="font-medium text-center flex gap-2 justify-center text-sm md:text-base pb-1 text-[#0E2F80] border-[#0E2F80]"
                      href={`/services/${service.slug}`}
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
