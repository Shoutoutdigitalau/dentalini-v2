"use client";

import { useState } from "react";
import hero from "@/assets/hero-dentalini.jpg";
import SubHeader from "@/components/layout/SubHeader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import BeforeAfterSlider from "@/components/ui/before-after-slider";

// Before/After transformation data
const implantAfterData = [

  {
    id: 2,
    before: "/Website/Implant/Single Implant cases/Pt 3/Before 1.JPG",
    after: "/Website/Implant/Single Implant cases/Pt 3/After 1.JPG",
    title: "Single Implant Treatment",
  },
  {
    id: 3,
    before: "/Website/Implant/Single Implant cases/Pt 5/Before 1.JPG",
    after: "/Website/Implant/Single Implant cases/Pt 5/After 1.JPG",
    title: "Single Implant Treatment",
  },
  {
    id: 4,
    before: "/Website/Implant/Full arch cases/Pt 2/Before 1.JPG",
    after: "/Website/Implant/Full arch cases/Pt 2/After 1.JPG",
    title: "Full Arch Implant Treatment",
  },
  {
    id: 5,
    before: "/Website/Implant/Smile Make-Over/Pt 1/Before 1.JPG",
    after: "/Website/Implant/Smile Make-Over/Pt 1/After 1.JPG",
    title: "Implant Smile Make-Over",
  },
];

const orthodonticsAfterData = [
  {
    id: 1,
    before: "/Orthodontics/Pt 1/DSC_1795.JPG",
    after: "/Orthodontics/Pt 1/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 2,
    before: "/Orthodontics/Pt 2/Before.JPG",
    after: "/Orthodontics/Pt 2/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 3,
    before: "/Orthodontics/Pt 3/Before.JPG",
    after: "/Orthodontics/Pt 3/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 4,
    before: "/Orthodontics/Pt 4/Before.JPG",
    after: "/Orthodontics/Pt 4/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 5,
    before: "/Orthodontics/Pt 5/Before.JPG",
    after: "/Orthodontics/Pt 5/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 6,
    before: "/Orthodontics/Pt 6/Before.JPG",
    after: "/Orthodontics/Pt 6/After.JPG",
    title: "Orthodontic Treatment",
  },
  {
    id: 7,
    before: "/Orthodontics/Pt 7/Before.JPG",
    after: "/Orthodontics/Pt 7/After.JPG",
    title: "Orthodontic Treatment",
  },
];

const cariesAfterData = [
  {
    id: 1,
    before: "/Caries/Pt 2/DSC_1026.JPG",
    after: "/Caries/Pt 2/DSC_1031.JPG",
    title: "Caries Treatment",
  },
  {
    id: 2,
    before: "/Caries/Pt 3/DSC_0016.JPG",
    after: "/Caries/Pt 3/DSC_0020.JPG",
    title: "Caries Treatment",
  },
];

const crownBridgeAfterData = [
  {
    id: 1,
    before: "/Crown & Bridge/Pt 1/After.JPG",
    after: "/Crown & Bridge/Pt 1/Before.JPG",
    title: "Crown & Bridge",
  },
  {
    id: 2,
    before: "/Crown & Bridge/Pt 2/DSC_1503.JPG",
    after: "/Crown & Bridge/Pt 2/DSC_1510.JPG",
    title: "Crown & Bridge",
  },
];

const hygieneAfterData = [
  {
    id: 1,
    before: "/Hygiene/DSC_1007.JPG",
    after: "/Hygiene/DSC_1014.JPG",
    title: "Dental Hygiene",
  },
];

const categories = [
  { id: "implants", label: "Dental Implants", count: implantAfterData.length },
  { id: "orthodontics", label: "Orthodontics", count: orthodonticsAfterData.length },
  { id: "caries", label: "Caries", count: cariesAfterData.length },
  { id: "crown-bridge", label: "Crown & Bridge", count: crownBridgeAfterData.length },
  { id: "hygiene", label: "Hygiene", count: hygieneAfterData.length },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("interior");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const getPreviewImage = (categoryId: string) => {
    switch (categoryId) {
      case "implants": return implantAfterData[0]?.after || "/hero-image.jpg";
      case "orthodontics": return orthodonticsAfterData[0]?.after || "/hero-image.jpg";
      case "caries": return cariesAfterData[0]?.after || "/hero-image.jpg";
      case "crown-bridge": return crownBridgeAfterData[0]?.after || "/hero-image.jpg";
      case "hygiene": return hygieneAfterData[0]?.after || "/hero-image.jpg";
      default: return "/hero-image.jpg";
    }
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case "implants": return implantAfterData;
      case "orthodontics": return orthodonticsAfterData;
      case "caries": return cariesAfterData;
      case "crown-bridge": return crownBridgeAfterData;
      case "hygiene": return hygieneAfterData;
      default: return null;
    }
  };

  const currentItem = getCurrentData()?.[currentIndex];

  return (
    <div>
      <SubHeader
        title="Gallery"
        description="Explore our modern clinic and treatment results."
      />

      <section className="container mx-auto py-20">
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => openCarousel(category.id)}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={getPreviewImage(category.id)}
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

      {/* Carousel Modal */}
      <Dialog open={!!selectedCategory} onOpenChange={() => closeCarousel()}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 rounded-full"
              onClick={closeCarousel}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateCarousel("prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateCarousel("next")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Main Content */}
            {currentItem && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="relative max-w-2xl w-full">
                  <BeforeAfterSlider
                    beforeImage={(currentItem as any).before}
                    afterImage={(currentItem as any).after}
                    beforeLabel="Before"
                    afterLabel="After"
                    className="rounded-lg"
                  />
                </div>

                {/* Image Info */}
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

            {/* Image Counter */}
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
