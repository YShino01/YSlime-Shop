import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from "@/components/ui/dialog";
import type { GalleryImage } from "@shared/schema";

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(6);
  const [selected, setSelected] = useState<GalleryImage | undefined>(undefined);

  const open = Boolean(selected);

  const handleImageError = (imageId: string) => {
    setFailedImages((prev) => new Set(prev).add(imageId));
  };

  // Responsive: mobile -> 3, md+ -> 6
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setItemsPerSlide(w < 768 ? 3 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buildSlides = () => {
    // don't add extra empty slots from the client side; server provides images (we keep total slots at server count)
    const baseExtra = 0;
    const totalAfterBase = images.length + baseExtra;
    const pad = totalAfterBase % itemsPerSlide === 0 ? 0 : itemsPerSlide - (totalAfterBase % itemsPerSlide);
    const extra = baseExtra + pad;
    const slots: (GalleryImage | undefined)[] = [...images, ...Array(extra).fill(undefined)];
    const slides: (typeof slots)[] = [];
    for (let i = 0; i < slots.length; i += itemsPerSlide) {
      slides.push(slots.slice(i, i + itemsPerSlide));
    }
    return slides;
  };

  const slides = buildSlides();

  return (
    <section className="w-full py-16 px-6 bg-background" data-testid="gallery-section">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-primary mb-12"
        >
          Product Gallery
        </motion.h2>

        <Carousel>
          <CarouselPrevious />
          <CarouselContent className="py-2">
            {slides.map((slide, sIdx) => (
              <CarouselItem key={`slide-${sIdx}`}>
                <div
                  className={
                    itemsPerSlide === 3
                      ? "grid grid-cols-1 grid-rows-3 gap-6"
                      : "grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6"
                  }
                >
                  {slide.map((image, idx) => {
                    const globalIdx = sIdx * itemsPerSlide + idx;
                    const key = image?.id ?? `placeholder-${globalIdx}`;

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: globalIdx * 0.04 }}
                      >
                        <Card className="overflow-hidden border-border hover:border-primary transition-all duration-300 group">
                          <div
                            className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 relative overflow-hidden cursor-pointer"
                            onClick={() => image && image.url && setSelected(image)}
                            role={image && image.url ? "button" : undefined}
                            tabIndex={image && image.url ? 0 : -1}
                            onKeyDown={(e) => {
                              if ((e.key === "Enter" || e.key === " ") && image && image.url) {
                                e.preventDefault();
                                setSelected(image);
                              }
                            }}
                          >
                            {image && image.url && !failedImages.has(image.id) ? (
                              <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={() => handleImageError(image.id)}
                                data-testid={`gallery-image-${globalIdx}`}
                              />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                <ImageIcon className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
                                {image ? (
                                  <span className="text-sm text-muted-foreground text-center px-4">{image.alt}</span>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
        {/* Lightbox dialog for selected image */}
        <Dialog open={open} onOpenChange={(v) => { if (!v) setSelected(undefined); }}>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="max-w-4xl">
              {selected && (
                <div className="w-full">
                  <img src={selected.url} alt={selected.alt} className="w-full h-[70vh] object-contain" />
                </div>
              )}
              <DialogClose />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </section>
  );
}

export default Gallery;


