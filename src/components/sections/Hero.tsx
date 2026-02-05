'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const slides = [
    {
      title: "Experience and Quality",
      subtitle: "Treatment You can",
      highlight: "Trust.",
      buttonText: "Book Appointment",
      image: "/hero-image.jpg"
    },
    {
      title: "Book your check-up",
      subtitle: "& clean",
      highlight: "now.",
      description: "New patient special of $290 for Comprehensive Examination, Consultation, Scale & Polish, Fluoride Application and OPG. **Returning patient special of $175 for Comprehensive Examination, Consultation, Scale & Polish and Fluoride Application.",
      buttonText: "Book Now",
      image: "/images/General.jpg"
    },
    {
      title: "Missing teeth?",
      subtitle: "Let's fix",
      highlight: "that!",
      description: "Don't let a missing tooth falter your smile. Enquire now for your free implant consult.",
      buttonText: "Book Free Consult",
      image: "/Website/General 2.jpg"
    },
    {
      title: "Considering",
      subtitle: "Veneers?",
      highlight: "",
      description: "Enquire now for your free consult.",
      buttonText: "Book Free Consult",
      image: "/hero-image.jpg"
    },
    {
      title: "Smile with confidence",
      subtitle: "with Philips Zoom",
      highlight: "Whitening",
      description: "In-chair whitening for $850. ** Take Home Whitening for $350.",
      buttonText: "Book Treatment",
      image: "/images/ComesticBanayanWebsitePic-1_1_.jpg"
    }
  ];

  return (
    <section aria-label="Hero" className="relative mb-16">
      <Carousel
        plugins={
          [
            Autoplay({
              delay: 5000,
            }),
          ]
        }
        className="mx-auto"
      >
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div className="bg-[#E5F6FD] min-h-[500px] sm:min-h-[600px] lg:h-[570px] overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute bottom-0 right-0 opacity-20 sm:opacity-30 lg:opacity-100">
                  <img src="/plus.svg" alt="" className="w-8 sm:w-12 lg:w-auto" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 sm:opacity-20 lg:opacity-100">
                  <img src="/heart-beat.svg" alt="" className="w-12 sm:w-16 lg:w-auto" />
                </div>
                <div className="absolute top-4 sm:top-8 lg:top-16 left-2 sm:left-4 lg:left-28">
                  <img className="w-8 sm:w-12 lg:w-20" src="/medical-icon1.svg" alt="" />
                </div>
                <div className="absolute top-1/2 left-1 sm:left-2 lg:left-7 -translate-y-1/2">
                  <img className="w-8 sm:w-12 lg:w-20" src="/medical-icon-2.svg" alt="" />
                </div>
                
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[570px] px-4">
                  {/* Content Section */}
                  <div className="flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 py-8 sm:py-12 lg:py-0 order-2 lg:order-1">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[70px] font-bold leading-tight sm:leading-tight lg:leading-[75px] text-[#0E2F80] text-center lg:text-left">
                      {slide.title} <span className="text-[#0091BA]">{slide.subtitle}</span> {slide.highlight}
                    </h1>
                    {slide.description && (
                      <p className="text-sm sm:text-base lg:text-lg text-[#0E2F80] max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                        {slide.description}
                      </p>
                    )}
                    <div className="flex justify-center lg:justify-start">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="w-full sm:w-auto max-w-xs"
                        onClick={() => window.open(`${process.env.NEXT_PUBLIC_PRAKTIKA_BOOKING_URL}?Apikey=${process.env.NEXT_PUBLIC_PRAKTIKA_API_KEY}`, '_blank')}
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div className="flex justify-center lg:justify-end items-end overflow-hidden order-1 lg:order-2 pb-4 lg:pb-0">
                    {idx === 0 ? (
                      <>
                        <div className="bg-[#0091BA] h-[150px] sm:h-[200px] lg:h-[300px] xl:h-[70%] mt-auto shadow-lg relative mb-2 lg:mb-5 overflow-hidden -mr-8 sm:-mr-12 lg:-mr-20 rounded-t-full w-[100px] sm:w-[150px] lg:w-[200px] xl:w-[300px]">
                          <img className="w-full h-full object-cover object-top" src="/hero-doctor.png" alt="Dental Professional" />
                        </div>
                        <div className="bg-[#0091BA] h-[150px] sm:h-[200px] lg:h-[300px] xl:h-[70%] mt-4 sm:mt-6 lg:mt-10 shadow-lg rounded-t-full w-[100px] sm:w-[150px] lg:w-[200px] xl:w-[300px] overflow-hidden">
                          <img className="w-full h-full object-cover object-top" src={slide.image} alt="Dental Treatment" />
                        </div>
                      </>
                    ) : (
                      <div className="relative">
                        <div className="bg-[#0091BA] h-[150px] sm:h-[200px] lg:h-[300px] xl:h-[450px] mt-4 sm:mt-6 lg:mt-10 shadow-lg rounded-t-full w-[100px] sm:w-[150px] lg:w-[200px] xl:w-[400px] overflow-hidden">
                          <img className="w-full h-full object-cover" src={slide.image} alt="Dental Treatment" />
                        </div>
                       
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
