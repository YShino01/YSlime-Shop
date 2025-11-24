import { z } from "zod";

// Gyroscope types available
export const gyroscopeTypes = ["ICM-45686", "LSM6DSR", "LSM6DSV"] as const;

export type GyroscopeType = typeof gyroscopeTypes[number];

// Gyroscope labels for display
export const gyroscopeLabels: Record<GyroscopeType, string> = {
  "ICM-45686": "ICM-45686 - Recommended",
  "LSM6DSR": "LSM6DSR - Cheapest",
  "LSM6DSV": "LSM6DSV - High-end",
};

// Tracker package schema
export const trackerPackageSchema = z.object({
  id: z.string(),
  trackerCount: z.number(),
  label: z.string().optional(), // "Recommended", "Advanced", "Dancer", etc.
  bodyPlacements: z.array(z.string()),
  basePrices: z.record(z.string(), z.number()), // prices by gyroscope type
  isRecommended: z.boolean().default(false),
});

export type TrackerPackage = z.infer<typeof trackerPackageSchema>;

// Accessory schema
export const accessorySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["strap", "charger"]),
  shopeeLink: z.string(),
  imageUrl: z.string().optional(),
});

export type Accessory = z.infer<typeof accessorySchema>;

// Gallery image schema
export const galleryImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

// Product detail feature schema
export const productDetailFeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(), // name of lucide icon (optional)
});

export type ProductDetailFeature = z.infer<typeof productDetailFeatureSchema>;

// Product data response
export const productDataSchema = z.object({
  packages: z.array(trackerPackageSchema),
  accessories: z.array(accessorySchema),
  galleryImages: z.array(galleryImageSchema),
  details: z.array(productDetailFeatureSchema),
});

export type ProductData = z.infer<typeof productDataSchema>;
