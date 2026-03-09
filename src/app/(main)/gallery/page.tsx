"use client";

import { useState, useEffect } from "react";
import SubHeader from "@/components/layout/SubHeader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import BeforeAfterSlider from "@/components/ui/before-after-slider";

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data.items || []);
  };

  const groupedByCategory = items.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedByCategory).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat,
    count: groupedByCategory[cat].length
  }));

  const openCarousel = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const closeCarousel = () => {
    setSelectedCategory(null);
    setCurrentIndex(0);
  };

  const navigateCarousel = (direction: "prev" | "next") => {
    const data = getCurrentData();
    if (!data) return;

    if (direction === "prev") {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : data.length - 1);
    } else {
      setCurrentIndex(currentIndex < data.length - 1 ? currentIndex + 1 : 0);
    }
  };

  const getPreviewImage = (categoryLabel: string) => {
    return groupedByCategory[categoryLabel]?.[0]?.afterImage || "/hero-image.jpg";
  };

  const getCurrentData = () => {
    if (!selectedCategory) return null;
    return groupedByCategory[selectedCategory];
  };

  const currentItem = getCurrentData()?.[currentIndex];

  return (
    <div>
      <SubHeader
        title="Gallery"
        description="Explore our modern clinic and treatment results."
      />

      <section className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => openCarousel(category.label)}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={getPreviewImage(category.label)}
                  alt={category.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{category.label}</h3>
                  <p className="text-sm opacity-90">{category.count} images</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={!!selectedCategory} onOpenChange={() => closeCarousel()}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 rounded-full"
              onClick={closeCarousel}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateCarousel("prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateCarousel("next")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {currentItem && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="relative max-w-2xl w-full">
                  <BeforeAfterSlider
                    beforeImage={currentItem.beforeImage}
                    afterImage={currentItem.afterImage}
                    beforeLabel="Before"
                    afterLabel="After"
                    className="rounded-lg"
                  />
                </div>

                <div className="text-center mt-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    {currentItem.title}
                  </h3>
                  <p className="text-gray-300">
                    Drag the slider to compare before and after
                  </p>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {getCurrentData()?.length || 0}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
