import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import type { TrackerPackage, GyroscopeType } from "@shared/schema";

interface ProductSliderProps {
  packages: TrackerPackage[];
  onPreOrder: (pkg: TrackerPackage, gyroscope: GyroscopeType, price: number) => void;
}

export function ProductSlider({ packages, onPreOrder }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, packages.length - 1));
    setCurrentIndex(newIndex);
    
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / packages.length;
      scrollRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => scrollTo(currentIndex - 1);
  const handleNext = () => scrollTo(currentIndex + 1);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6" data-testid="product-slider">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex-shrink-0 w-full md:w-96 snap-center">
              <ProductCard
                package={pkg}
                onPreOrder={(gyroscope, price) => onPreOrder(pkg, gyroscope, price)}
              />
            </div>
          ))}
        </div>

        {currentIndex > 0 && (
          <Button
            onClick={handlePrevious}
            size="icon"
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card border-primary/50 hover:bg-primary/20 shadow-lg z-10"
            data-testid="button-slider-prev"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Button>
        )}

        {currentIndex < packages.length - 1 && (
          <Button
            onClick={handleNext}
            size="icon"
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card border-primary/50 hover:bg-primary/20 shadow-lg z-10"
            data-testid="button-slider-next"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </Button>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {packages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-primary w-8" : "bg-primary/30 hover:bg-primary/50"
            }`}
            data-testid={`slider-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
