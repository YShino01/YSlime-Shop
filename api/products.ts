import type { VercelRequest, VercelResponse } from '@vercel/node';

const packages = [
  {
    id: "pkg-5",
    trackerCount: 5,
    bodyPlacements: ["Chest", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    basePrices: {
      "ICM-45686": 449,
      "LSM6DSR": 389,
      "LSM6DSV": 569
    },
    isRecommended: false
  },
  {
    id: "pkg-6",
    trackerCount: 6,
    label: "Recommended",
    bodyPlacements: ["Chest", "Hip", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    basePrices: {
      "ICM-45686": 519.00,
      "LSM6DSR": 449.00,
      "LSM6DSV": 669.00,
    },
    isRecommended: true
  },
  // {
  //   id: "pkg-7",
  //   trackerCount: 7,
  //   label: "Advanced",
  //   bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
  //   basePrices: {
  //     "ICM-45686": 599.00,
  //     "LSM6DSR": 509.00,
  //     "LSM6DSV": 769.00
  //   },
  //   isRecommended: false
  // },
  {
    id: "pkg-8",
    trackerCount: 8,
    label: "Dancer", // label: "Advanced",
    bodyPlacements: ["Chest", "Hip", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
    basePrices: {
      "ICM-45686": 669.00,
      "LSM6DSR": 569.00,
      "LSM6DSV": 869.00,
    },
    isRecommended: false,
  },
  // {
  //   id: "pkg-9",
  //   trackerCount: 9,
  //   label: "Dancer",
  //   bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
  //   basePrices: {
  //     "ICM-45686": 759.00,
  //     "LSM6DSR": 639.00,
  //     "LSM6DSV": 969.00,
  //   },
  //   isRecommended: false,
  // },
  {
    id: "pkg-10",
    trackerCount: 10,
    label: "Ultimate",
    bodyPlacements: ["Chest", "Hip", "Left Upper Arm", "Right Upper Arm", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
    basePrices: {
      "ICM-45686": 819.00,
      "LSM6DSR": 699.00,
      "LSM6DSV": 1069.00,
    },
    isRecommended: false,
  },
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
  { id: "img-1", url: "https://i.imgur.com/gMTQgzS.png", alt: "SlimeVR Tracker - Front View" },
  { id: "img-2", url: "https://i.imgur.com/mi25NID.png", alt: "SlimeVR Tracker - PCB Detail" },
  { id: "img-3", url: "https://i.imgur.com/gMTQgzS.png", alt: "Full Body Tracker Setup" },
  { id: "img-4", url: "https://i.imgur.com/dFnD0Ew.png", alt: "Tracker with Strap Mount" },
  { id: "img-5", url: "https://i.imgur.com/eAnDpZo.png", alt: "Multiple Trackers Charging" },
  { id: "img-6", url: "https://i.imgur.com/NCN4BmN.png", alt: "Size Comparison" },
  { id: "img-7", url: "https://i.imgur.com/G482zr1.png", alt: "Image" },
  { id: "img-8", url: "https://i.imgur.com/B60Rj8m.png", alt: "Image-2" },
  { id: "img-9", url: "https://i.imgur.com/MzAw9L3.png", alt: "Image-3" },
  { id: "img-10", url: "https://i.imgur.com/sBxGYFv.png", alt: "Image-4" },
  { id: "img-11", url: "https://i.imgur.com/0KhdLkt.png", alt: "Image-5" },
  { id: "img-12", url: "https://i.imgur.com/lAOxGsH.png", alt: "Image-6" }
];

// Product detail feature cards (mirrors server/storage.ts)
const details = [
  {
    id: "wireless",
    title: "Dedicated Wireless Link",
    description: "nRF52840 2.4GHz receiver dongle – no WiFi required, low latency and stable tracking.",
    icon: "WifiOff",
  },
  {
    id: "imu",
    title: "Precision IMU Sensors",
    description: "LSM6DSV / LSM6DSR batches provide accurate 6-axis motion data for full-body presence.",
    icon: "Crosshair",
  },
  {
    id: "design",
    title: "Compact Durable Design",
    description: "Lightweight enclosure with strap / velcro mounting – comfortable for long VR sessions.",
    icon: "Box",
  },
  {
    id: "power",
    title: "USB-C Charging",
    description: "Rechargeable battery with simple multi-port hub charging – grab & go convenience.",
    icon: "Battery",
  },
  {
    id: "regional",
    title: "Malaysia Only",
    description: "Locally assembled & tested – currently shipping exclusively within Malaysia.",
    icon: "MapPin",
  },
  {
    id: "assembly",
    title: "Hand-Assembled & Tested",
    description: "Each unit validated before shipping to ensure reliable calibration & performance.",
    icon: "CheckCircle",
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({
      packages,
      accessories,
      galleryImages,
      details,
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Failed to fetch product data" });
  }
}
