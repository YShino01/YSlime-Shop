import { z } from "zod";

// Gyroscope types available
export const gyroscopeTypes = ["ICM-45686", "LSM6DSR", "LSM6DSV"] as const;

export type GyroscopeType = typeof gyroscopeTypes[number];

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

// Product data response
export const productDataSchema = z.object({
  packages: z.array(trackerPackageSchema),
  accessories: z.array(accessorySchema),
  galleryImages: z.array(galleryImageSchema),
});

export type ProductData = z.infer<typeof productDataSchema>;
