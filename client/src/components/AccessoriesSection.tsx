import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cable, Armchair } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Accessory } from "@shared/schema";

interface AccessoriesSectionProps {
  accessories: Accessory[];
}

export function AccessoriesSection({ accessories }: AccessoriesSectionProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const straps = accessories.filter((a) => a.category === "strap");
  const chargers = accessories.filter((a) => a.category === "charger");

  const handleImageError = (itemId: string) => {
    setFailedImages(prev => new Set(prev).add(itemId));
  };

  const getAccessoryIcon = (category: string) => {
    return category === "strap" ? Armchair : Cable;
  };

  const renderAccessoryGroup = (items: Accessory[], title: string, testId: string) => (
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, idx) => {
          const Icon = getAccessoryIcon(item.category);
          const showFallback = !item.imageUrl || failedImages.has(item.id);
          
          return (
            <Card
              key={item.id}
              className="p-4 bg-card border-border hover:border-primary transition-all group"
              data-testid={`${testId}-${idx}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {showFallback ? (
                    <Icon className="w-8 h-8 text-primary/60" />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(item.id)}
                      data-testid={`accessory-image-${testId}-${idx}`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{item.name}</h4>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary/20 flex-shrink-0"
                  onClick={() => window.open(item.shopeeLink, "_blank")}
                  data-testid={`button-shopee-${testId}-${idx}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Shopee
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="w-full py-16 px-6 bg-background" data-testid="accessories-section">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-primary mb-12"
        >
          Recommended Accessories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderAccessoryGroup(straps, "Straps", "strap")}
          {renderAccessoryGroup(chargers, "Chargers", "charger")}
        </div>
      </div>
    </section>
  );
}
