import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "./ProductCard";
import type { TrackerPackage, GyroscopeType } from "@shared/schema";
import { gyroscopeLabels } from "@shared/schema";

interface ProductSliderProps {
  packages: TrackerPackage[];
  onPreOrder: (pkg: TrackerPackage, gyroscope: GyroscopeType, price: number) => void;
}

export function ProductSlider({ packages, onPreOrder }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGyro, setSelectedGyro] = useState<GyroscopeType>("ICM-45686");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate how many cards are visible at once based on screen size
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop: 3 cards
      if (window.innerWidth >= 768) return 2; // Tablet: ~2 cards
      return 1; // Mobile: 1 card
    }
    return 1;
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, packages.length - visibleCards);

  // Update currentIndex when user swipes/scrolls
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const cards = scrollContainer.children;
      if (cards.length === 0) return;

      const firstCard = cards[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // 6 * 4px (gap-6)
      const scrollLeft = scrollContainer.scrollLeft;
      
      // Calculate which card index is currently centered/visible
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
      
      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex);
      }
    };

    // Use a timeout to debounce the scroll event
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    scrollContainer.addEventListener('scroll', debouncedHandleScroll);
    
    return () => {
      clearTimeout(scrollTimeout);
      scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [currentIndex, maxIndex]);

  const scrollTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    
    if (scrollRef.current) {
      const cards = scrollRef.current.children;
      if (cards.length > 0) {
        const firstCard = cards[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // 6 * 4px (gap-6)
        const scrollPosition = newIndex * (cardWidth + gap);
        
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrevious = () => scrollTo(currentIndex - 1);
  const handleNext = () => scrollTo(currentIndex + 1);

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8" data-testid="product-slider">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-6 max-w-xs mx-auto">
          <label className="text-sm text-muted-foreground">Gyroscope Type</label>
          <Select value={selectedGyro} onValueChange={(v) => setSelectedGyro(v as GyroscopeType)}>
            <SelectTrigger className="bg-input border-border" data-testid="gyro-select-global">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ICM-45686" data-testid="gyro-option-ICM-45686">{gyroscopeLabels["ICM-45686"]}</SelectItem>
              <SelectItem value="LSM6DSR" data-testid="gyro-option-LSM6DSR">{gyroscopeLabels["LSM6DSR"]}</SelectItem>
              <SelectItem value="LSM6DSV" data-testid="gyro-option-LSM6DSV">{gyroscopeLabels["LSM6DSV"]}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative overflow-hidden px-8 sm:px-10 lg:px-12">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="flex-shrink-0 w-full sm:w-[70vw] md:w-[45vw] lg:w-[calc((100%-3rem)/3)] snap-center"
              >
                <ProductCard
                  package={pkg}
                  selectedGyro={selectedGyro}
                  onPreOrder={(gyroscope, price) => onPreOrder(pkg, gyroscope, price)}
                />
              </div>
            ))}
          </div>
        </div>

        {currentIndex > 0 && (
          <Button
            onClick={handlePrevious}
            size="icon"
            variant="ghost"
            aria-label="Previous products"
            className="!absolute left-0 top-1/2 -translate-y-1/2 !z-20 h-10 w-10 rounded-full bg-card/70 backdrop-blur-sm border border-border/60 text-primary shadow-sm hover:shadow-md hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-95 transition-all"
            data-testid="button-slider-prev"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
        )}

        {currentIndex < maxIndex && (
          <Button
            onClick={handleNext}
            size="icon"
            variant="ghost"
            aria-label="Next products"
            className="!absolute right-0 top-1/2 -translate-y-1/2 !z-20 h-10 w-10 rounded-full bg-card/70 backdrop-blur-sm border border-border/60 text-primary shadow-sm hover:shadow-md hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-95 transition-all"
            data-testid="button-slider-next"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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
