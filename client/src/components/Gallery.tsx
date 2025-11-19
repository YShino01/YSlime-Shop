import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setFailedImages(prev => new Set(prev).add(imageId));
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden border-border hover:border-primary transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 relative overflow-hidden">
                  {image.url && !failedImages.has(image.id) ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(image.id)}
                      data-testid={`gallery-image-${idx}`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <ImageIcon className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
                      <span className="text-sm text-muted-foreground text-center px-4">{image.alt}</span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
