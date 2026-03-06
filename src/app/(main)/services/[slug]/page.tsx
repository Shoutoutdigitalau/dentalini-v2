import { notFound } from "next/navigation";
import SubHeader from "@/components/layout/SubHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import "./service-content.css";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  await dbConnect();
  const service = await Service.findOne({ slug }).lean();

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description,
    keywords: service.metaKeywords || "",
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  await dbConnect();
  const service = await Service.findOne({ slug }).lean();
  const otherServices = await Service.find({ slug: { $ne: slug } }).limit(2).lean();

  if (!service) {
    notFound();
  }

  return (
    <div>
      <SubHeader title={service.title} description="" />

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Service Content */}
          <div 
            className="service-content text-gray-800 text-base leading-7"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />

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
              {otherServices.map((otherService: any) => (
                <Link key={otherService._id.toString()} href={`/services/${otherService.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={otherService.image || "/thumbnail_shutterstock_168128375.jpg"} 
                        alt={otherService.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#0E2F80] mb-2 group-hover:text-[#0091BA] transition-colors">
                        {otherService.title}
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
