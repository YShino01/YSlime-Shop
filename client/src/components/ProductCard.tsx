import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TrackerPackage, GyroscopeType } from "@shared/schema";
import { Check } from "lucide-react";

interface ProductCardProps {
  package: TrackerPackage;
  selectedGyro: GyroscopeType;
  onPreOrder: (gyroscope: GyroscopeType, price: number) => void;
}

export function ProductCard({ package: pkg, selectedGyro, onPreOrder }: ProductCardProps) {
  const currentPrice = pkg.basePrices[selectedGyro] || 0;

  return (
    <div className="flex flex-col gap-4 w-full h-full" data-testid={`product-card-${pkg.trackerCount}`}>
      <Card
        className={`relative p-6 bg-card border-2 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
          pkg.isRecommended ? "border-primary shadow-lg shadow-primary/25" : "border-card-border"
        }`}
      >
        {pkg.label && (
          <Badge
            className={`absolute -top-2.5 right-2 w-fit ${
              pkg.isRecommended
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
            data-testid={`badge-label-${pkg.trackerCount}`}
          >
            {pkg.label}
          </Badge>
        )}

        <div className="flex flex-col gap-6 flex-1">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2" data-testid={`tracker-count-${pkg.trackerCount}`}>
              {pkg.trackerCount}
            </div>
            <div className="text-lg text-muted-foreground">Trackers</div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="text-sm font-semibold text-card-foreground mb-3">Included Placements:</div>
            <div className="grid grid-cols-1 gap-2">
              {pkg.bodyPlacements.map((placement, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-card-foreground"
                  data-testid={`placement-${pkg.trackerCount}-${idx}`}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{placement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGyro}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary" data-testid={`price-${pkg.trackerCount}`}>
                  RM {currentPrice.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">MYR</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            onClick={() => onPreOrder(selectedGyro, currentPrice)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg py-6"
            data-testid={`button-preorder-${pkg.trackerCount}`}
          >
            Pre-Order Now
          </Button>
        </div>
      </Card>
    </div>
  );
}
