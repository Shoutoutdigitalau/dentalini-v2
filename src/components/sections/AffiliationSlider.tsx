'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AffiliationSliderProps {
  affiliations: {
    _id: string;
    name: string;
    logo: string;
    url?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

const AffiliationSlider = ({ 
  affiliations, 
  autoPlay = true, 
  interval = 3000 
}: AffiliationSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % affiliations.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, affiliations.length]);

  // Duplicate affiliations for seamless loop
  const duplicatedAffiliations = [...affiliations, ...affiliations];

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
            Our Affiliations
          </h2>
          <p className="text-muted-foreground">
            Proud members of leading dental organizations
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex items-center transition-transform duration-1000 ease-linear"
            style={{ 
              transform: `translateX(-${(currentIndex * 100) / affiliations.length}%)`,
              width: `${duplicatedAffiliations.length * (100 / affiliations.length)}%`
            }}
          >
            {duplicatedAffiliations.map((affiliation, index) => (
              <div 
                key={`${affiliation._id}-${index}`} 
                className="flex-shrink-0 px-8 flex items-center justify-center"
                style={{ width: `${100 / affiliations.length}%` }}
              >
                {affiliation.url ? (
                  <a 
                    href={affiliation.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={affiliation.logo}
                      alt={affiliation.name}
                      width={150}
                      height={80}
                      className="max-h-16 md:max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                ) : (
                  <Image
                    src={affiliation.logo}
                    alt={affiliation.name}
                    width={150}
                    height={80}
                    className="max-h-16 md:max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliationSlider;
