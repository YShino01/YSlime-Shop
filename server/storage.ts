import type { TrackerPackage, Accessory, GalleryImage, ProductData, ProductDetailFeature } from "@shared/schema";

export interface IStorage {
  getProductData(): Promise<ProductData>;
}

export class MemStorage implements IStorage {
  private packages: TrackerPackage[] = [
    {
      id: "pkg-5",
      trackerCount: 5,
      bodyPlacements: ["Chest", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
      basePrices: {
        "ICM-45686": 449.00,
        "LSM6DSR": 389.00,
        "LSM6DSV": 569.00,
      },
      isRecommended: false,
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
      isRecommended: true,
    },
    // {
    //   id: "pkg-7",
    //   trackerCount: 7,
    //   label: "Advanced",
    //   bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
    //   basePrices: {
    //     "ICM-45686": 599.00,
    //     "LSM6DSR": 509.00,
    //     "LSM6DSV": 769.00,
    //   },
    //   isRecommended: false,
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

  private accessories: Accessory[] = [
    {
      id: "strap-1",
      name: "Elastic Ankle Straps (Pair)",
      category: "strap",
      shopeeLink: "https://shopee.com.my/search?keyword=elastic+ankle+straps",
    },
    {
      id: "strap-2",
      name: "Adjustable Thigh Straps (Pair)",
      category: "strap",
      shopeeLink: "https://shopee.com.my/search?keyword=adjustable+thigh+straps",
    },
    {
      id: "strap-3",
      name: "Chest Strap Mount",
      category: "strap",
      shopeeLink: "https://shopee.com.my/search?keyword=chest+strap+mount",
    },
    {
      id: "charger-1",
      name: "5-Port USB Charger Hub",
      category: "charger",
      shopeeLink: "https://shopee.com.my/search?keyword=5+port+usb+charger",
    },
    {
      id: "charger-2",
      name: "USB-C Charging Cables (5-Pack)",
      category: "charger",
      shopeeLink: "https://shopee.com.my/search?keyword=usb+c+charging+cables",
    },
  ];

  private galleryImages: GalleryImage[] = [
    { id: "img-1", url: "/front%20view2.png", alt: "SlimeVR Tracker - Front View" },
    { id: "img-2", url: "/size2.png", alt: "SlimeVR Tracker - PCB Detail" },
    { id: "img-3", url: "/size.png", alt: "Full Body Tracker Setup" },
    { id: "img-4", url: "/case.png", alt: "Tracker with Strap Mount" },
    { id: "img-5", url: "/case2.png", alt: "Multiple Trackers Charging" },
    { id: "img-6", url: "/velcro.png", alt: "Size Comparison" },
    // Additional placeholder slots (empty URLs) so gallery has room for more images
    { id: "img-7", url: "/inside.png", alt: "Image" },
    { id: "img-8", url: "/receiver.png", alt: "Image-2" },
    { id: "img-9", url: "/receiver3.png", alt: "Image-3" },
    { id: "img-10", url: "/charging.png", alt: "Image-4" },
    { id: "img-11", url: "/velcro%20strap2.png", alt: "Image-5" },
    { id: "img-12", url: "/velcro%20strap.png", alt: "Image-6" },
  ];

  private details: ProductDetailFeature[] = [
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

  async getProductData(): Promise<ProductData> {
    return {
      packages: this.packages,
      accessories: this.accessories,
      galleryImages: this.galleryImages,
      details: this.details,
    };
  }
}

export const storage = new MemStorage();
