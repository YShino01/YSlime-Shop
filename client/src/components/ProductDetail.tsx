import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
    WifiOff,
    Crosshair,
    Box,
    Battery,
    MapPin,
    CheckCircle,
} from "lucide-react";
import type { ProductDetailFeature } from "@shared/schema";

interface ProductDetailProps {
    details: ProductDetailFeature[];
}

const iconMap: Record<string, React.ReactNode> = {
    WifiOff: <WifiOff className="w-6 h-6 text-primary" />,
    Crosshair: <Crosshair className="w-6 h-6 text-primary" />,
    Box: <Box className="w-6 h-6 text-primary" />,
    Battery: <Battery className="w-6 h-6 text-primary" />,
    MapPin: <MapPin className="w-6 h-6 text-primary" />,
    CheckCircle: <CheckCircle className="w-6 h-6 text-primary" />,
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ details }) => {
    return (
        <section className="w-full py-16 px-6 bg-background" data-testid="product-details-section">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center text-primary mb-12"
                >
                    Product Details
                </motion.h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {details.map((feature, idx) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                            <Card className="p-5 h-full flex flex-col gap-3 bg-card border-border hover:border-primary transition">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                                        {feature.icon ? iconMap[feature.icon] : <Box className="w-6 h-6 text-primary" />}
                                    </div>
                                    <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
                        <h4 className="text-sm font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Important Notes</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-900 dark:text-yellow-300">
                            <li>No WiFi required – uses dedicated 2.4GHz receiver.</li>
                            <li>Compatible with PC VR setups supported by SlimeVR.</li>
                            <li>Locally assembled & tested prior to shipping.</li>
                            <li>Available only within Malaysia at this time.</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                        <p className="text-sm text-blue-900 dark:text-blue-300">
                            Focused on making full-body tracking reliable, precise, and accessible without complexity.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;