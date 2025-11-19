import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiDiscord, SiShopee } from "react-icons/si";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TrackerPackage, GyroscopeType } from "@shared/schema";

interface PreOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: {
    package: TrackerPackage;
    gyroscope: GyroscopeType;
    price: number;
  };
}

export function PreOrderPopup({ isOpen, onClose, selectedPackage }: PreOrderPopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          data-testid="popup-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-black/80 backdrop-blur-sm rounded-lg" />
            <Card className="relative w-full max-w-md bg-card border-2 border-primary p-8" data-testid="preorder-popup">
              <Button
                onClick={onClose}
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 text-foreground hover:text-primary"
                data-testid="button-close-popup"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </Button>

              <h2 className="text-2xl font-bold text-center text-primary mb-2">
                Pre-Order Tracker Package
              </h2>

              {selectedPackage && (
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="popup-package-info">
                    {selectedPackage.package.trackerCount} Trackers
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {selectedPackage.gyroscope} • RM {selectedPackage.price.toFixed(2)}
                  </div>
                </div>
              )}

              <p className="text-center text-muted-foreground mb-6">
                Choose your preferred contact method:
              </p>

              <div className="flex flex-col gap-4">
                <Card
                  className="p-6 bg-secondary border-border hover:border-primary hover:bg-primary/10 transition-all cursor-pointer group"
                  onClick={() => window.open("https://discord.com", "_blank")}
                  data-testid="option-discord-direct"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">Contact me on Discord</h3>
                      <p className="text-sm text-muted-foreground">Direct message for inquiries</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 bg-secondary border-border hover:border-primary hover:bg-primary/10 transition-all cursor-pointer group"
                  onClick={() => window.open("https://discord.gg/slimevr", "_blank")}
                  data-testid="option-discord-server"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <SiDiscord className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">Join Discord Server</h3>
                      <p className="text-sm text-muted-foreground">Community support & updates</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 bg-secondary border-border hover:border-primary hover:bg-primary/10 transition-all cursor-pointer group"
                  onClick={() => window.open("https://shopee.com.my", "_blank")}
                  data-testid="option-shopee"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <SiShopee className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">Shopee / Carousell</h3>
                      <p className="text-sm text-muted-foreground">Browse marketplace listings</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
