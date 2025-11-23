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
  const firstStrap = straps[0];

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
          const displayName = title === "Chargers"
            ? item.name.includes("5-Port")
              ? "7-Port USB Charger Hub"
              : item.name.includes("USB-C Charging Cables")
                ? "USB C Adapter Male OTG TypeC"
                : item.name
            : item.name;
          const shopeeLink = title === "Chargers"
            ? item.name.includes("5-Port")
              ? "https://shopee.com.my/USB-HUB-OTG-High-Speed-Splitter-Adapter-7-Port-4-Port-Multiple-Expander-Switch-Extender-Cable-i.188678203.41969610365?extraParams=%7B%22display_model_id%22%3A266604733019%2C%22model_selection_logic%22%3A3%7D&sp_atk=7609c9bb-ca01-465e-a2f6-296bfb13f925&xptdk=7609c9bb-ca01-465e-a2f6-296bfb13f925"
              : item.name.includes("USB-C Charging Cables")
                ? "https://shopee.com.my/USB-C-Adapter-Male-OTG-TypeC-To-A-Easy-To-Carry-Mini-Size-With-Aluminum-Shell-Accessories-For-Data-Synchronization-Laptop-U-Disk-i.243781635.25721405807?extraParams=%7B%22display_model_id%22%3A204997969818%2C%22model_selection_logic%22%3A3%7D&sp_atk=99d82d92-6fdf-4733-9b7a-f543aa98863f&xptdk=99d82d92-6fdf-4733-9b7a-f543aa98863f"
                : item.shopeeLink
            : item.shopeeLink;
          
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
                  <h4 className="font-medium text-card-foreground">{displayName}</h4>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary/20 flex-shrink-0"
                  onClick={() => window.open(shopeeLink, "_blank")}
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
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-4">Straps</h3>
            <div className="space-y-4">
              {(() => {
                const item = firstStrap;
                const Icon = getAccessoryIcon("strap");
                const showFallback = !item || !item.imageUrl || failedImages.has(item?.id ?? "strap-fallback");
                return (
                  <Card
                    className="p-4 bg-card border-border hover:border-primary transition-all group"
                    data-testid={`strap-0`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        {showFallback ? (
                          <Icon className="w-8 h-8 text-primary/60" />
                        ) : (
                          <img
                            src={item!.imageUrl}
                            alt={"Elastic Velcro Straps"}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(item!.id)}
                            data-testid={`accessory-image-strap-0`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">Elastic Velcro Straps</h4>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/50 text-primary hover:bg-primary/20 flex-shrink-0"
                        onClick={() => window.open("https://shopee.com.my/1-Piece-Nylon-Elastic-Velcro-Elastic-Buckle-Strap-Self-adhesive-Reusable-Buckle-Band-i.29426973.4556170011", "_blank")}
                        data-testid={`button-shopee-strap-0`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Shopee
                      </Button>
                    </div>
                  </Card>
                );
              })()}
            </div>
          </div>
          {renderAccessoryGroup(chargers, "Chargers", "charger")}
        </div>
      </div>
    </section>
  );
}
