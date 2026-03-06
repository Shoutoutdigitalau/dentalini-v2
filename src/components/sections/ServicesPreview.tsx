'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
}

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      const featuredServices = data.services?.filter((s: Service) => s.featured).sort((a: Service, b: Service) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) || [];
      setServices(featuredServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="text-center py-12 text-slate-600">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No featured services available.</div>
        ) : (
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service._id} className="p-3 md:p-4 bg-[#FFFFFF] shadow-lg rounded-[14px]">
                <div>
                  <img
                    className="w-full aspect-video object-cover rounded-[10px]"
                    src={service.image || "/thumbnail_shutterstock_168128375.jpg"}
                    alt={service.title}
                  />
                </div>

                <div className="mt-4 md:mt-[30px]">
                  <h3 className="text-center text-lg md:text-2xl text-[#0B131E] font-semibold mb-2 md:mb-3 line-clamp-1">
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
        )}

        <div className="flex justify-center">
          <Button variant="hero" size="lg" className="mt-8 md:mt-12 w-full sm:w-auto" asChild>
            <Link href="/services">View all Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
