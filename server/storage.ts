import type { TrackerPackage, Accessory, GalleryImage, ProductData } from "@shared/schema";

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
    {
      id: "pkg-7",
      trackerCount: 7,
      label: "Advanced",
      bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle"],
      basePrices: {
        "ICM-45686": 599.00,
        "LSM6DSR": 509.00,
        "LSM6DSV": 769.00,
      },
      isRecommended: false,
    },
    {
      id: "pkg-8",
      trackerCount: 8,
      label: "Advanced",
      bodyPlacements: ["Chest", "Hip", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
      basePrices: {
        "ICM-45686": 629.00,
        "LSM6DSR": 569.00,
        "LSM6DSV": 869.00,
      },
      isRecommended: false,
    },
    {
      id: "pkg-9",
      trackerCount: 9,
      label: "Dancer",
      bodyPlacements: ["Chest", "Hip", "Waist", "Left Thigh", "Right Thigh", "Left Ankle", "Right Ankle", "Left Foot", "Right Foot"],
      basePrices: {
        "ICM-45686": 699.00,
        "LSM6DSR": 639.00,
        "LSM6DSV": 969.00,
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
    { id: "img-1", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442278540404985956/front_view2.png?ex=6924da10&is=69238890&hm=169feed2feb732c4ee7b07ec899df4871c921e47398d6e8cf3acfcf72cf12c9a&", alt: "SlimeVR Tracker - Front View" },
    { id: "img-2", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442271423157768342/size2.png?ex=6924d36f&is=692381ef&hm=760628420feba81be891223881df8af8afdf6343b7e61458805dfda705cb322d&", alt: "SlimeVR Tracker - PCB Detail" },
    { id: "img-3", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442254833133424824/size.png?ex=6924c3fc&is=6923727c&hm=a9a07d47b5d65caa17f3b041ed36e02c1a19665f2e9f0778f3ccf93c091ab661&", alt: "Full Body Tracker Setup" },
    { id: "img-4", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442271838397923479/case.png?ex=6924d3d2&is=69238252&hm=ceec73bdfe2c8c86cd7f97f8df7024d0306a48fc089ddc885b832aafc2a30e57&", alt: "Tracker with Strap Mount" },
    { id: "img-5", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442272011584929923/case2.png?ex=6924d3fb&is=6923827b&hm=382cd85c55b37561791e1ea992df8cb002b9c79215c10d580cb4c7c534c0433a&", alt: "Multiple Trackers Charging" },
    { id: "img-6", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442271927501590699/velcro.png?ex=6924d3e7&is=69238267&hm=e4772e665b894d25d35e3834e2c0fed663ae7e38f7c6da92d000626915ee9edc&", alt: "Size Comparison" },
    // Additional placeholder slots (empty URLs) so gallery has room for more images
    { id: "img-7", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442255011366178919/inside.png?ex=6924c426&is=692372a6&hm=4ce4c1d44464c798a0f718b5c5105639938052b25497c2cd4f8b625fba946072&", alt: "Image" },
    { id: "img-8", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442272123828572342/receiver.png?ex=6924d416&is=69238296&hm=4976a285dc0d6d9e1d172590cdb48aad0aec75bd88ec4e862f49ba3a04f26697&", alt: "Image-2" },
    { id: "img-9", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442275410284118098/receiver3.png?ex=6924d725&is=692385a5&hm=bb76cb7e7c7f331247b80936d31dd631c6bb0a7d1c4bdf03b43e224f079aeb1b&", alt: "Image-3" },
    { id: "img-10", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442279808716378312/charging.png?ex=6924db3e&is=692389be&hm=c7f4a4ac3cdeaadf4e7db28d4b7e5331a1abf65189503756a71f67da5b4b3132&", alt: "Image-4" },
    { id: "img-11", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442272427894640771/velcro_strap2.png?ex=6924d45e&is=692382de&hm=314f76a001ff5aae6933a0d99e94b2d07342e234d1afb34e97e841b56d7bc994&", alt: "Image-5" },
    { id: "img-12", url: "https://cdn.discordapp.com/attachments/902612839758458921/1442272420349349979/velcro_strap.png?ex=6924d45d&is=692382dd&hm=a9d580ef7a7f7dd5606abe149e7d90ef06402f85da5cbb468f93308a6f4c179b&", alt: "Image-6" },
  ];

  async getProductData(): Promise<ProductData> {
    return {
      packages: this.packages,
      accessories: this.accessories,
      galleryImages: this.galleryImages,
    };
  }
}

export const storage = new MemStorage();
