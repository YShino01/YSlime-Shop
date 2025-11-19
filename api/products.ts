import type { VercelRequest, VercelResponse } from '@vercel/node';

const packages = [
  {
    id: "pkg-5",
    trackerCount: 5,
    bodyPlacements: ["Chest", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    basePrices: {
      "ICM-45686": 850,
      "LSM6DSR": 920,
      "LSM6DSV": 980
    },
    isRecommended: false
  },
  {
    id: "pkg-6",
    trackerCount: 6,
    label: "Recommended",
    bodyPlacements: ["Chest", "Hip", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    basePrices: {
      "ICM-45686": 1050,
      "LSM6DSR": 1120,
      "LSM6DSV": 1180
    },
    isRecommended: true
  },
  {
    id: "pkg-7",
    trackerCount: 7,
    label: "Advanced",
    bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    basePrices: {
      "ICM-45686": 1250,
      "LSM6DSR": 1320,
      "LSM6DSV": 1380
    },
    isRecommended: false
  },
  {
    id: "pkg-8",
    trackerCount: 8,
    label: "Advanced",
    bodyPlacements: ["Chest", "Hip", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
    basePrices: {
      "ICM-45686": 1450,
      "LSM6DSR": 1520,
      "LSM6DSV": 1580
    },
    isRecommended: false
  },
  {
    id: "pkg-9",
    trackerCount: 9,
    label: "Dancer",
    bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
    basePrices: {
      "ICM-45686": 1650,
      "LSM6DSR": 1720,
      "LSM6DSV": 1780
    },
    isRecommended: false
  }
];

const accessories = [
  {
    id: "strap-1",
    name: "Elastic Ankle Straps (Pair)",
    category: "strap",
    shopeeLink: "https://shopee.com.my/search?keyword=elastic+ankle+straps"
  },
  {
    id: "strap-2",
    name: "Adjustable Thigh Straps (Pair)",
    category: "strap",
    shopeeLink: "https://shopee.com.my/search?keyword=adjustable+thigh+straps"
  },
  {
    id: "strap-3",
    name: "Chest Strap Mount",
    category: "strap",
    shopeeLink: "https://shopee.com.my/search?keyword=chest+strap+mount"
  },
  {
    id: "charger-1",
    name: "5-Port USB Charger Hub",
    category: "charger",
    shopeeLink: "https://shopee.com.my/search?keyword=5+port+usb+charger"
  },
  {
    id: "charger-2",
    name: "USB-C Charging Cables (5-Pack)",
    category: "charger",
    shopeeLink: "https://shopee.com.my/search?keyword=usb+c+charging+cables"
  }
];

const galleryImages = [
  { id: "img-1", url: "", alt: "SlimeVR Tracker - Front View" },
  { id: "img-2", url: "", alt: "SlimeVR Tracker - PCB Detail" },
  { id: "img-3", url: "", alt: "Full Body Tracker Setup" },
  { id: "img-4", url: "", alt: "Tracker with Strap Mount" },
  { id: "img-5", url: "", alt: "Multiple Trackers Charging" },
  { id: "img-6", url: "", alt: "Size Comparison" }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({
      packages,
      accessories,
      galleryImages
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Failed to fetch product data" });
  }
}
