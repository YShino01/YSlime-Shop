import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Header } from "@/components/Header";
import { ProductSlider } from "@/components/ProductSlider";
import { PreOrderPopup } from "@/components/PreOrderPopup";
import { Gallery } from "@/components/Gallery";
import { AccessoriesSection } from "@/components/AccessoriesSection";
import type { ProductData, TrackerPackage, GyroscopeType } from "@shared/schema";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [preOrderData, setPreOrderData] = useState<{
    package: TrackerPackage;
    gyroscope: GyroscopeType;
    price: number;
  } | null>(null);

  const { data, isLoading } = useQuery<ProductData>({
    queryKey: ["/api/products"],
  });

  const handlePreOrder = (pkg: TrackerPackage, gyroscope: GyroscopeType, price: number) => {
    setPreOrderData({ package: pkg, gyroscope, price });
  };

  return (
    <div className="min-h-screen bg-background">
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      <Header show={introComplete} />

      {introComplete && (
        <main className="pt-24">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-[80vh] flex flex-col items-center justify-center py-16"
            data-testid="products-section"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
                SlimeVR Trackers
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-6">
                Premium full-body tracking solutions for VR. Choose the perfect package for your needs.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data ? (
              <ProductSlider packages={data.packages} onPreOrder={handlePreOrder} />
            ) : null}
          </motion.section>

          {data && (
            <>
              <Gallery images={data.galleryImages} />
              <AccessoriesSection accessories={data.accessories} />
            </>
          )}

          <footer className="border-t border-border py-8 px-6 mt-16">
            <div className="container mx-auto text-center text-muted-foreground">
              <p>© 2024 YSlime. All rights reserved.</p>
            </div>
          </footer>
        </main>
      )}

      <PreOrderPopup
        isOpen={preOrderData !== null}
        onClose={() => setPreOrderData(null)}
        selectedPackage={preOrderData || undefined}
      />
    </div>
  );
}
