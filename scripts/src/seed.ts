import { db } from "@workspace/db";
import { categoriesTable, brandsTable, productsTable, promotionsTable, reviewsTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

async function seed() {
  const seedMode = process.env.SEED_MODE === "bootstrap" ? "bootstrap" : "reset";
  console.log(`🌱 Seeding TechMarket DZ database in ${seedMode} mode...`);

  if (seedMode === "bootstrap") {
    const existing = await db.select().from(productsTable).limit(1);
    if (existing.length > 0) {
      console.log("Bootstrap seed skipped; products already present");
      return;
    }
  }

  if (seedMode === "reset") {
    await db.execute(sql`TRUNCATE TABLE reviews, orders, products, categories, brands, promotions RESTART IDENTITY CASCADE`);
  }

  // Categories
  const [smartphones, laptops, tvs, homeAppliances, smallAppliances, gaming, accessories] = await db.insert(categoriesTable).values([
    { name: "Smartphones & Tablettes", nameAr: "الهواتف والأجهزة اللوحية", slug: "smartphones", description: "Les derniers smartphones et tablettes", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Smartphones", icon: "📱" },
    { name: "Laptops & Ordinateurs", nameAr: "الحاسوب المحمول والمكتبي", slug: "laptops", description: "Ordinateurs portables et de bureau", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Laptops", icon: "💻" },
    { name: "TV & Audio", nameAr: "التلفزيون والصوتيات", slug: "tv-audio", description: "Téléviseurs, Home Cinéma et Audio", imageUrl: "https://placehold.co/400x300/0f172a/white?text=TV+%26+Audio", icon: "📺" },
    { name: "Gros Électroménager", nameAr: "الأجهزة المنزلية الكبيرة", slug: "home-appliances", description: "Réfrigérateurs, Lave-linge, Climatiseurs", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Electroménager", icon: "🏠" },
    { name: "Petit Électroménager", nameAr: "الأجهزة المنزلية الصغيرة", slug: "small-appliances", description: "Mixeurs, Cafetières, Aspirateurs", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Petit+Electro", icon: "⚡" },
    { name: "Gaming & Jeux Vidéo", nameAr: "الألعاب الإلكترونية", slug: "gaming", description: "Consoles, Jeux et Accessoires Gaming", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Gaming", icon: "🎮" },
    { name: "Accessoires", nameAr: "الاكسسوارات", slug: "accessories", description: "Coques, Chargeurs, Câbles, Montres connectées", imageUrl: "https://placehold.co/400x300/0f172a/white?text=Accessoires", icon: "🎧" },
  ]).returning();

  console.log("✅ Categories seeded");

  // Brands
  const [samsung, apple, xiaomi, lg, sony, huawei, oppo, lenovo, hp, dell, asus, hisense, tcl, condor, realme] = await db.insert(brandsTable).values([
    { name: "Samsung", slug: "samsung", logoUrl: "https://placehold.co/200x100/1428a0/white?text=Samsung", description: "Leader mondial de l'électronique", country: "Corée du Sud", featured: true },
    { name: "Apple", slug: "apple", logoUrl: "https://placehold.co/200x100/555555/white?text=Apple", description: "Innovation technologique premium", country: "États-Unis", featured: true },
    { name: "Xiaomi", slug: "xiaomi", logoUrl: "https://placehold.co/200x100/ff6900/white?text=Xiaomi", description: "Technologie accessible à tous", country: "Chine", featured: true },
    { name: "LG", slug: "lg", logoUrl: "https://placehold.co/200x100/a50034/white?text=LG", description: "Innovation pour une vie meilleure", country: "Corée du Sud", featured: true },
    { name: "Sony", slug: "sony", logoUrl: "https://placehold.co/200x100/003087/white?text=Sony", description: "Qualité audio et visuelle incomparable", country: "Japon", featured: true },
    { name: "Huawei", slug: "huawei", logoUrl: "https://placehold.co/200x100/cf0a2c/white?text=Huawei", description: "Technologie de pointe", country: "Chine", featured: true },
    { name: "Oppo", slug: "oppo", logoUrl: "https://placehold.co/200x100/1e8c1c/white?text=OPPO", description: "Smartphones haut de gamme", country: "Chine", featured: false },
    { name: "Lenovo", slug: "lenovo", logoUrl: "https://placehold.co/200x100/e2231a/white?text=Lenovo", description: "Ordinateurs et tablettes fiables", country: "Chine", featured: true },
    { name: "HP", slug: "hp", logoUrl: "https://placehold.co/200x100/0096d6/white?text=HP", description: "Technologie informatique de qualité", country: "États-Unis", featured: true },
    { name: "Dell", slug: "dell", logoUrl: "https://placehold.co/200x100/007db8/white?text=Dell", description: "Ordinateurs professionnels et personnels", country: "États-Unis", featured: false },
    { name: "Asus", slug: "asus", logoUrl: "https://placehold.co/200x100/00539b/white?text=ASUS", description: "Performance et fiabilité", country: "Taïwan", featured: false },
    { name: "Hisense", slug: "hisense", logoUrl: "https://placehold.co/200x100/00a0e0/white?text=Hisense", description: "Électronique grand public", country: "Chine", featured: false },
    { name: "TCL", slug: "tcl", logoUrl: "https://placehold.co/200x100/c41230/white?text=TCL", description: "Téléviseurs abordables de qualité", country: "Chine", featured: false },
    { name: "Condor", slug: "condor", logoUrl: "https://placehold.co/200x100/009900/white?text=Condor", description: "Marque algérienne de confiance", country: "Algérie", featured: true },
    { name: "Realme", slug: "realme", logoUrl: "https://placehold.co/200x100/ffd700/333?text=Realme", description: "Smartphones pour la jeunesse", country: "Chine", featured: false },
  ]).returning();

  console.log("✅ Brands seeded");

  // Products - Smartphones
  const smartphoneProducts = await db.insert(productsTable).values([
    {
      name: "Samsung Galaxy S24 Ultra 5G", nameAr: "سامسونج غالاكسي S24 ألترا 5G",
      slug: "samsung-galaxy-s24-ultra", description: "Le flagship ultime avec S Pen intégré, écran Dynamic AMOLED 6.8\", appareil photo 200MP et processeur Snapdragon 8 Gen 3.",
      price: "189000", originalPrice: "210000", discountPercent: 10,
      categoryId: smartphones.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=S24+Ultra",
      images: ["https://placehold.co/800x800/1a1a2e/white?text=S24+Ultra+1", "https://placehold.co/800x800/16213e/white?text=S24+Ultra+2"],
      rating: "4.8", reviewCount: 245, inStock: true, stockQuantity: 15, featured: true, isNew: true,
      tags: ["5G", "flagship", "S Pen", "200MP"],
      specifications: [
        { group: "Général", key: "Système d'exploitation", value: "Android 14 / One UI 6.1" },
        { group: "Général", key: "Processeur", value: "Snapdragon 8 Gen 3" },
        { group: "Général", key: "RAM", value: "12 GB" },
        { group: "Général", key: "Stockage", value: "256 GB" },
        { group: "Écran", key: "Taille", value: "6.8 pouces" },
        { group: "Écran", key: "Résolution", value: "3088 x 1440 pixels (QHD+)" },
        { group: "Écran", key: "Type", value: "Dynamic AMOLED 2X" },
        { group: "Appareil photo", key: "Principal", value: "200 MP (f/1.7)" },
        { group: "Appareil photo", key: "Frontal", value: "12 MP" },
        { group: "Batterie", key: "Capacité", value: "5000 mAh" },
        { group: "Batterie", key: "Recharge", value: "45W filaire, 15W sans fil" },
        { group: "Connectivité", key: "Réseau", value: "5G / 4G LTE" },
        { group: "Connectivité", key: "Wi-Fi", value: "Wi-Fi 7" },
      ]
    },
    {
      name: "Samsung Galaxy A55 5G", nameAr: "سامسونج غالاكسي A55 5G",
      slug: "samsung-galaxy-a55", description: "Milieu de gamme premium avec écran Super AMOLED 6.6\", caméra 50MP et batterie 5000 mAh.",
      price: "65000", originalPrice: "72000", discountPercent: 10,
      categoryId: smartphones.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Galaxy+A55",
      images: ["https://placehold.co/800x800/1428a0/white?text=A55+1"],
      rating: "4.5", reviewCount: 189, inStock: true, stockQuantity: 40, featured: true, isNew: true,
      tags: ["5G", "50MP", "milieu de gamme"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Exynos 1480" },
        { group: "Général", key: "RAM", value: "8 GB" },
        { group: "Général", key: "Stockage", value: "128 GB" },
        { group: "Écran", key: "Taille", value: "6.6 pouces Super AMOLED" },
        { group: "Appareil photo", key: "Principal", value: "50 MP" },
        { group: "Batterie", key: "Capacité", value: "5000 mAh" },
      ]
    },
    {
      name: "Xiaomi 14 Pro 5G", nameAr: "شاومي 14 برو 5G",
      slug: "xiaomi-14-pro", description: "Flagship Xiaomi avec optique Leica, écran AMOLED 6.73\" 120Hz et charge rapide 120W.",
      price: "145000", originalPrice: null, discountPercent: null,
      categoryId: smartphones.id, brandId: xiaomi.id,
      imageUrl: "https://placehold.co/400x400/ff6900/white?text=Xiaomi+14+Pro",
      images: ["https://placehold.co/800x800/ff6900/white?text=Xiaomi+14+Pro"],
      rating: "4.7", reviewCount: 98, inStock: true, stockQuantity: 20, featured: true, isNew: true,
      tags: ["5G", "Leica", "120W", "flagship"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Snapdragon 8 Gen 3" },
        { group: "Général", key: "RAM", value: "12 GB" },
        { group: "Écran", key: "Taille", value: "6.73 pouces AMOLED 120Hz" },
        { group: "Appareil photo", key: "Principal", value: "50 MP Leica" },
        { group: "Batterie", key: "Capacité", value: "4880 mAh" },
        { group: "Batterie", key: "Recharge", value: "120W filaire" },
      ]
    },
    {
      name: "Xiaomi Redmi Note 13 Pro 4G", nameAr: "شاومي ريدمي نوت 13 برو",
      slug: "xiaomi-redmi-note-13-pro", description: "Rapport qualité-prix exceptionnel avec caméra 200MP et charge rapide 67W.",
      price: "45000", originalPrice: "52000", discountPercent: 13,
      categoryId: smartphones.id, brandId: xiaomi.id,
      imageUrl: "https://placehold.co/400x400/e75480/white?text=Redmi+Note+13",
      images: ["https://placehold.co/800x800/e75480/white?text=Redmi+Note+13"],
      rating: "4.4", reviewCount: 312, inStock: true, stockQuantity: 80, featured: true, isNew: false,
      tags: ["200MP", "67W", "rapport qualité-prix"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Helio G99 Ultra" },
        { group: "Général", key: "RAM", value: "8 GB" },
        { group: "Appareil photo", key: "Principal", value: "200 MP" },
        { group: "Batterie", key: "Capacité", value: "5100 mAh" },
      ]
    },
    {
      name: "iPhone 15 Pro Max", nameAr: "آيفون 15 برو ماكس",
      slug: "iphone-15-pro-max", description: "Le summum de Apple avec puce A17 Pro, cadre en titane et caméra 48MP avec zoom 5x.",
      price: "210000", originalPrice: null, discountPercent: null,
      categoryId: smartphones.id, brandId: apple.id,
      imageUrl: "https://placehold.co/400x400/555555/white?text=iPhone+15+PM",
      images: ["https://placehold.co/800x800/555555/white?text=iPhone+15+PM"],
      rating: "4.9", reviewCount: 567, inStock: true, stockQuantity: 8, featured: true, isNew: false,
      tags: ["iOS", "titanium", "A17 Pro", "5x zoom"],
      specifications: [
        { group: "Général", key: "Puce", value: "A17 Pro" },
        { group: "Général", key: "Stockage", value: "256 GB" },
        { group: "Écran", key: "Taille", value: "6.7 pouces Super Retina XDR" },
        { group: "Appareil photo", key: "Principal", value: "48 MP (f/1.78)" },
        { group: "Batterie", key: "Recharge", value: "MagSafe 15W" },
      ]
    },
    {
      name: "Huawei Nova 11 Pro", nameAr: "هواوي نوفا 11 برو",
      slug: "huawei-nova-11-pro", description: "Design élégant avec caméra selfie 60MP, recharge ultra-rapide et OLED 6.78\".",
      price: "62000", originalPrice: "68000", discountPercent: 9,
      categoryId: smartphones.id, brandId: huawei.id,
      imageUrl: "https://placehold.co/400x400/cf0a2c/white?text=Nova+11+Pro",
      images: ["https://placehold.co/800x800/cf0a2c/white?text=Nova+11+Pro"],
      rating: "4.3", reviewCount: 87, inStock: true, stockQuantity: 25, featured: false, isNew: false,
      tags: ["OLED", "60MP selfie", "design"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Snapdragon 778G 4G" },
        { group: "Appareil photo", key: "Selfie", value: "60 MP" },
        { group: "Écran", key: "Taille", value: "6.78 pouces OLED" },
        { group: "Batterie", key: "Capacité", value: "4500 mAh" },
      ]
    },
    {
      name: "Oppo Reno 11 Pro 5G", nameAr: "أوبو رينو 11 برو 5G",
      slug: "oppo-reno-11-pro", description: "Style et performance avec portrait AI, écran AMOLED courbe et charge SUPERVOOC 80W.",
      price: "75000", originalPrice: "82000", discountPercent: 9,
      categoryId: smartphones.id, brandId: oppo.id,
      imageUrl: "https://placehold.co/400x400/1e8c1c/white?text=Reno+11+Pro",
      images: ["https://placehold.co/800x800/1e8c1c/white?text=Reno+11+Pro"],
      rating: "4.4", reviewCount: 65, inStock: true, stockQuantity: 30, featured: false, isNew: true,
      tags: ["5G", "SUPERVOOC", "portrait AI"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Dimensity 8200" },
        { group: "Appareil photo", key: "Principal", value: "50 MP" },
        { group: "Batterie", key: "Recharge", value: "80W SUPERVOOC" },
      ]
    },
    {
      name: "Realme C67 4G", nameAr: "ريلمي C67",
      slug: "realme-c67", description: "Smartphone entrée de gamme avec caméra 108MP et processeur Snapdragon 685.",
      price: "22000", originalPrice: "25000", discountPercent: 12,
      categoryId: smartphones.id, brandId: realme.id,
      imageUrl: "https://placehold.co/400x400/ffd700/333?text=Realme+C67",
      images: ["https://placehold.co/800x800/ffd700/333?text=Realme+C67"],
      rating: "4.0", reviewCount: 134, inStock: true, stockQuantity: 100, featured: false, isNew: false,
      tags: ["108MP", "entrée de gamme", "Snapdragon"],
      specifications: [
        { group: "Général", key: "Processeur", value: "Snapdragon 685" },
        { group: "Appareil photo", key: "Principal", value: "108 MP" },
        { group: "Batterie", key: "Capacité", value: "5000 mAh" },
      ]
    },
  ]).returning();

  // Laptops
  const laptopProducts = await db.insert(productsTable).values([
    {
      name: "HP Victus 16 Gaming", nameAr: "لابتوب إتش بي فيكتوس 16 للألعاب",
      slug: "hp-victus-16-gaming", description: "Laptop gaming avec RTX 4060, Intel i7-13700H, 16GB RAM, écran 144Hz.",
      price: "165000", originalPrice: "185000", discountPercent: 11,
      categoryId: laptops.id, brandId: hp.id,
      imageUrl: "https://placehold.co/400x400/0096d6/white?text=HP+Victus+16",
      images: ["https://placehold.co/800x800/0096d6/white?text=HP+Victus+16"],
      rating: "4.6", reviewCount: 78, inStock: true, stockQuantity: 12, featured: true, isNew: true,
      tags: ["gaming", "RTX 4060", "144Hz", "i7"],
      specifications: [
        { group: "Processeur", key: "Modèle", value: "Intel Core i7-13700H" },
        { group: "Processeur", key: "Fréquence", value: "Jusqu'à 5.0 GHz" },
        { group: "Mémoire", key: "RAM", value: "16 GB DDR5" },
        { group: "Stockage", key: "SSD", value: "512 GB NVMe" },
        { group: "Écran", key: "Taille", value: "16.1 pouces FHD" },
        { group: "Écran", key: "Taux de rafraîchissement", value: "144 Hz" },
        { group: "Carte graphique", key: "GPU", value: "NVIDIA RTX 4060 8GB" },
        { group: "Batterie", key: "Autonomie", value: "Jusqu'à 8h" },
      ]
    },
    {
      name: "Lenovo ThinkPad X1 Carbon Gen 11", nameAr: "لينوفو ثينك باد X1 كاربون",
      slug: "lenovo-thinkpad-x1-carbon", description: "Ultrabook professionnel léger en carbone, i7 vPro, 16GB, OLED 2.8K.",
      price: "220000", originalPrice: null, discountPercent: null,
      categoryId: laptops.id, brandId: lenovo.id,
      imageUrl: "https://placehold.co/400x400/1a1a1a/white?text=ThinkPad+X1",
      images: ["https://placehold.co/800x800/1a1a1a/white?text=ThinkPad+X1"],
      rating: "4.8", reviewCount: 45, inStock: true, stockQuantity: 5, featured: true, isNew: false,
      tags: ["professionnel", "OLED", "ultrabook", "i7 vPro"],
      specifications: [
        { group: "Processeur", key: "Modèle", value: "Intel Core i7-1365U vPro" },
        { group: "Mémoire", key: "RAM", value: "16 GB LPDDR5" },
        { group: "Écran", key: "Type", value: "OLED 2.8K Touch" },
        { group: "Poids", key: "Poids", value: "1.12 kg" },
      ]
    },
    {
      name: "Asus ROG Strix G16 Gaming", nameAr: "أسوس ROG ستريكس G16",
      slug: "asus-rog-strix-g16", description: "Gaming puissant avec RTX 4070, Ryzen 9, écran 165Hz QHD et RGB.",
      price: "245000", originalPrice: "270000", discountPercent: 9,
      categoryId: laptops.id, brandId: asus.id,
      imageUrl: "https://placehold.co/400x400/00539b/white?text=ROG+Strix+G16",
      images: ["https://placehold.co/800x800/00539b/white?text=ROG+Strix+G16"],
      rating: "4.7", reviewCount: 52, inStock: true, stockQuantity: 7, featured: false, isNew: true,
      tags: ["gaming", "RTX 4070", "QHD", "RGB", "Ryzen 9"],
      specifications: [
        { group: "Processeur", key: "Modèle", value: "AMD Ryzen 9 7945HX" },
        { group: "Mémoire", key: "RAM", value: "32 GB DDR5" },
        { group: "Carte graphique", key: "GPU", value: "NVIDIA RTX 4070 8GB" },
        { group: "Écran", key: "Taille", value: "16 pouces QHD 165Hz" },
      ]
    },
    {
      name: "Dell Inspiron 15 3520", nameAr: "ديل إنسبيرون 15",
      slug: "dell-inspiron-15", description: "Laptop polyvalent i5-1235U, 8GB RAM, 512GB SSD pour usage quotidien.",
      price: "78000", originalPrice: "85000", discountPercent: 8,
      categoryId: laptops.id, brandId: dell.id,
      imageUrl: "https://placehold.co/400x400/007db8/white?text=Dell+Inspiron+15",
      images: ["https://placehold.co/800x800/007db8/white?text=Dell+Inspiron+15"],
      rating: "4.2", reviewCount: 167, inStock: true, stockQuantity: 35, featured: false, isNew: false,
      tags: ["polyvalent", "i5", "quotidien"],
      specifications: [
        { group: "Processeur", key: "Modèle", value: "Intel Core i5-1235U" },
        { group: "Mémoire", key: "RAM", value: "8 GB DDR4" },
        { group: "Stockage", key: "SSD", value: "512 GB" },
        { group: "Écran", key: "Taille", value: "15.6 pouces FHD" },
      ]
    },
  ]).returning();

  // TVs
  const tvProducts = await db.insert(productsTable).values([
    {
      name: "Samsung NEO QLED 4K 65\" QN90C", nameAr: "سامسونج نيو QLED 4K 65 بوصة",
      slug: "samsung-neo-qled-65-qn90c", description: "TV premium avec technologie Quantum Mini LED, proceseur Neo Quantum et Dolby Atmos.",
      price: "285000", originalPrice: "320000", discountPercent: 11,
      categoryId: tvs.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Samsung+QLED+65",
      images: ["https://placehold.co/800x800/1428a0/white?text=Samsung+QLED+65"],
      rating: "4.8", reviewCount: 89, inStock: true, stockQuantity: 6, featured: true, isNew: false,
      tags: ["4K", "QLED", "Neo", "Dolby Atmos", "65 pouces"],
      specifications: [
        { group: "Écran", key: "Taille", value: "65 pouces" },
        { group: "Écran", key: "Résolution", value: "4K Ultra HD (3840 x 2160)" },
        { group: "Écran", key: "Technologie", value: "Neo QLED (Quantum Mini LED)" },
        { group: "Image", key: "HDR", value: "HDR10+, Dolby Vision" },
        { group: "Audio", key: "Puissance", value: "60W" },
        { group: "Audio", key: "Format", value: "Dolby Atmos" },
        { group: "Connectivité", key: "HDMI", value: "4x HDMI 2.1" },
        { group: "Smart TV", key: "OS", value: "Tizen OS" },
      ]
    },
    {
      name: "LG OLED 55\" C3 4K", nameAr: "إل جي أوليد 55 بوصة C3",
      slug: "lg-oled-55-c3", description: "OLED avec α9 Gen6 AI Processor, HDMI 2.1 gaming et Dolby Vision.",
      price: "195000", originalPrice: "220000", discountPercent: 11,
      categoryId: tvs.id, brandId: lg.id,
      imageUrl: "https://placehold.co/400x400/a50034/white?text=LG+OLED+C3",
      images: ["https://placehold.co/800x800/a50034/white?text=LG+OLED+C3"],
      rating: "4.9", reviewCount: 143, inStock: true, stockQuantity: 9, featured: true, isNew: false,
      tags: ["OLED", "4K", "Gaming", "Dolby Vision", "55 pouces"],
      specifications: [
        { group: "Écran", key: "Taille", value: "55 pouces" },
        { group: "Écran", key: "Technologie", value: "OLED evo" },
        { group: "Image", key: "Résolution", value: "4K Ultra HD" },
        { group: "Gaming", key: "Taux de rafraîchissement", value: "120Hz" },
        { group: "Gaming", key: "G-Sync", value: "Compatible Freesync Premium" },
        { group: "Smart TV", key: "OS", value: "webOS 23" },
      ]
    },
    {
      name: "TCL 65\" 4K QLED C645", nameAr: "تي سي إل 65 بوصة 4K QLED",
      slug: "tcl-65-qled-c645", description: "Excellent rapport qualité-prix avec QLED, Google TV et Dolby Vision IQ.",
      price: "105000", originalPrice: "120000", discountPercent: 13,
      categoryId: tvs.id, brandId: tcl.id,
      imageUrl: "https://placehold.co/400x400/c41230/white?text=TCL+QLED+65",
      images: ["https://placehold.co/800x800/c41230/white?text=TCL+QLED+65"],
      rating: "4.3", reviewCount: 201, inStock: true, stockQuantity: 18, featured: false, isNew: false,
      tags: ["QLED", "4K", "Google TV", "65 pouces"],
      specifications: [
        { group: "Écran", key: "Taille", value: "65 pouces" },
        { group: "Écran", key: "Technologie", value: "QLED" },
        { group: "Smart TV", key: "OS", value: "Google TV" },
        { group: "Image", key: "HDR", value: "Dolby Vision IQ" },
      ]
    },
    {
      name: "Sony Bravia XR 55\" A95L OLED", nameAr: "سوني برافيا XR A95L",
      slug: "sony-bravia-a95l-oled", description: "Le meilleur OLED selon Sony avec QD-OLED et Cognitive Processor XR.",
      price: "265000", originalPrice: null, discountPercent: null,
      categoryId: tvs.id, brandId: sony.id,
      imageUrl: "https://placehold.co/400x400/003087/white?text=Sony+A95L",
      images: ["https://placehold.co/800x800/003087/white?text=Sony+A95L"],
      rating: "4.9", reviewCount: 67, inStock: true, stockQuantity: 4, featured: true, isNew: false,
      tags: ["QD-OLED", "4K", "Cognitive XR", "55 pouces"],
      specifications: [
        { group: "Écran", key: "Technologie", value: "QD-OLED" },
        { group: "Écran", key: "Résolution", value: "4K (3840 × 2160)" },
        { group: "Audio", key: "Format", value: "Dolby Atmos, DTS:X" },
      ]
    },
    {
      name: "Hisense 43\" 4K UHD Smart TV", nameAr: "هايسينس 43 بوصة 4K",
      slug: "hisense-43-4k-smart", description: "TV 4K UHD abordable avec VIDAA Smart TV, Dolby Vision et 2 HDMI.",
      price: "45000", originalPrice: "52000", discountPercent: 13,
      categoryId: tvs.id, brandId: hisense.id,
      imageUrl: "https://placehold.co/400x400/00a0e0/white?text=Hisense+43",
      images: ["https://placehold.co/800x800/00a0e0/white?text=Hisense+43"],
      rating: "4.1", reviewCount: 298, inStock: true, stockQuantity: 45, featured: false, isNew: false,
      tags: ["4K", "abordable", "Smart TV", "43 pouces"],
      specifications: [
        { group: "Écran", key: "Taille", value: "43 pouces" },
        { group: "Smart TV", key: "OS", value: "VIDAA U6" },
        { group: "Image", key: "Résolution", value: "4K Ultra HD" },
      ]
    },
  ]).returning();

  // Home Appliances
  const applianceProducts = await db.insert(productsTable).values([
    {
      name: "Samsung Réfrigérateur Side by Side 617L", nameAr: "سامسونج ثلاجة سايد باي سايد",
      slug: "samsung-refrigerateur-617l", description: "Réfrigérateur No Frost Side by Side, distributeur d'eau et glace, Twin Cooling Plus.",
      price: "185000", originalPrice: "205000", discountPercent: 10,
      categoryId: homeAppliances.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Samsung+Réfrigérateur",
      images: ["https://placehold.co/800x800/1428a0/white?text=Réfrigérateur"],
      rating: "4.5", reviewCount: 56, inStock: true, stockQuantity: 8, featured: true, isNew: false,
      tags: ["No Frost", "617L", "inox", "distributeur eau"],
      specifications: [
        { group: "Général", key: "Capacité", value: "617 L" },
        { group: "Général", key: "Classe énergétique", value: "A+" },
        { group: "Général", key: "Couleur", value: "Inox" },
        { group: "Congélateur", key: "Capacité", value: "195 L" },
        { group: "Réfrigérateur", key: "Capacité", value: "422 L" },
        { group: "Dimensions", key: "H x L x P", value: "178 x 91.2 x 71.6 cm" },
      ]
    },
    {
      name: "LG Lave-linge Front 9Kg A+++", nameAr: "إل جي غسالة أمامية 9 كغ",
      slug: "lg-lave-linge-9kg", description: "Lave-linge frontal avec moteur DD Direct Drive, AI DD et 6 Motion.",
      price: "72000", originalPrice: "80000", discountPercent: 10,
      categoryId: homeAppliances.id, brandId: lg.id,
      imageUrl: "https://placehold.co/400x400/a50034/white?text=LG+Lave-linge",
      images: ["https://placehold.co/800x800/a50034/white?text=LG+Lave-linge"],
      rating: "4.6", reviewCount: 89, inStock: true, stockQuantity: 15, featured: false, isNew: false,
      tags: ["9kg", "A+++", "Direct Drive", "AI"],
      specifications: [
        { group: "Général", key: "Capacité", value: "9 kg" },
        { group: "Général", key: "Classe énergétique", value: "A+++" },
        { group: "Général", key: "Vitesse d'essorage", value: "1400 tr/min" },
        { group: "Moteur", key: "Type", value: "Direct Drive" },
      ]
    },
    {
      name: "Condor Climatiseur 24000 BTU Inverter", nameAr: "كوندور مكيف هواء 24000 BTU",
      slug: "condor-clim-24000-btu", description: "Climatiseur Inverter algérien économique A++, fonction chauffage.",
      price: "78000", originalPrice: "85000", discountPercent: 8,
      categoryId: homeAppliances.id, brandId: condor.id,
      imageUrl: "https://placehold.co/400x400/009900/white?text=Condor+Clim",
      images: ["https://placehold.co/800x800/009900/white?text=Condor+Clim"],
      rating: "4.2", reviewCount: 234, inStock: true, stockQuantity: 25, featured: true, isNew: false,
      tags: ["Inverter", "24000 BTU", "chauffage", "A++"],
      specifications: [
        { group: "Général", key: "Capacité", value: "24000 BTU" },
        { group: "Général", key: "Technologie", value: "Inverter" },
        { group: "Général", key: "Classe énergétique", value: "A++" },
        { group: "Fonctions", key: "Mode", value: "Froid / Chaud" },
      ]
    },
    {
      name: "Samsung Congélateur Vertical 315L", nameAr: "سامسونج مجمد عمودي 315 لتر",
      slug: "samsung-congelateur-315l", description: "Congélateur vertical No Frost avec All-Around Cooling et Grande Tiroir.",
      price: "62000", originalPrice: "70000", discountPercent: 11,
      categoryId: homeAppliances.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Congélateur+315L",
      images: ["https://placehold.co/800x800/1428a0/white?text=Congélateur"],
      rating: "4.3", reviewCount: 45, inStock: true, stockQuantity: 12, featured: false, isNew: false,
      tags: ["No Frost", "315L", "congélateur"],
      specifications: [
        { group: "Général", key: "Capacité", value: "315 L" },
        { group: "Général", key: "Type", value: "No Frost" },
        { group: "Général", key: "Classe énergétique", value: "A+" },
      ]
    },
  ]).returning();

  // Gaming
  const gamingProducts = await db.insert(productsTable).values([
    {
      name: "Sony PlayStation 5 Slim", nameAr: "سوني بلايستيشن 5 سليم",
      slug: "sony-ps5-slim", description: "Console PS5 Slim avec SSD ultra-rapide 1TB, Ray Tracing et jusqu'à 120FPS.",
      price: "95000", originalPrice: "105000", discountPercent: 10,
      categoryId: gaming.id, brandId: sony.id,
      imageUrl: "https://placehold.co/400x400/003087/white?text=PS5+Slim",
      images: ["https://placehold.co/800x800/003087/white?text=PS5+Slim"],
      rating: "4.9", reviewCount: 445, inStock: true, stockQuantity: 10, featured: true, isNew: false,
      tags: ["PS5", "4K", "Ray Tracing", "120FPS"],
      specifications: [
        { group: "Général", key: "CPU", value: "AMD Zen 2, 8 cores" },
        { group: "Général", key: "GPU", value: "AMD RDNA 2, 10.28 TFLOPS" },
        { group: "Général", key: "Stockage", value: "1 TB SSD personnalisé" },
        { group: "Général", key: "RAM", value: "16 GB GDDR6" },
        { group: "Affichage", key: "Résolution max", value: "4K 120Hz" },
      ]
    },
    {
      name: "DualSense Controller PS5 Midnight Black", nameAr: "ذراع تحكم PS5 أسود",
      slug: "dualsense-ps5-midnight-black", description: "Manette PS5 avec retour haptique, gâchettes adaptatives et rechargeable.",
      price: "8900", originalPrice: "10000", discountPercent: 11,
      categoryId: gaming.id, brandId: sony.id,
      imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=DualSense+Black",
      images: ["https://placehold.co/800x800/1a1a2e/white?text=DualSense"],
      rating: "4.8", reviewCount: 287, inStock: true, stockQuantity: 50, featured: false, isNew: false,
      tags: ["PS5", "manette", "haptique"],
      specifications: [
        { group: "Connectivité", key: "Type", value: "Bluetooth 5.1" },
        { group: "Batterie", key: "Autonomie", value: "12-15 heures" },
      ]
    },
  ]).returning();

  // Accessories
  const accessoriesProducts = await db.insert(productsTable).values([
    {
      name: "Samsung Galaxy Buds3 Pro", nameAr: "سامسونج غالاكسي بودز 3 برو",
      slug: "samsung-galaxy-buds3-pro", description: "Écouteurs ANC premium avec son Hi-Fi, ANC Intelligent et autonomie 30h.",
      price: "18500", originalPrice: "22000", discountPercent: 16,
      categoryId: accessories.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Buds3+Pro",
      images: ["https://placehold.co/800x800/1428a0/white?text=Buds3+Pro"],
      rating: "4.6", reviewCount: 156, inStock: true, stockQuantity: 60, featured: true, isNew: true,
      tags: ["ANC", "TWS", "Hi-Fi", "30h autonomie"],
      specifications: [
        { group: "Audio", key: "Réduction de bruit", value: "ANC Intelligent" },
        { group: "Batterie", key: "Autonomie totale", value: "30 heures" },
        { group: "Connectivité", key: "Bluetooth", value: "Bluetooth 5.4" },
      ]
    },
    {
      name: "Xiaomi Smart Watch S3", nameAr: "شاومي ساعة ذكية S3",
      slug: "xiaomi-watch-s3", description: "Montre intelligente AMOLED avec GPS intégré, 15 jours d'autonomie et 150+ sports.",
      price: "15000", originalPrice: "18000", discountPercent: 17,
      categoryId: accessories.id, brandId: xiaomi.id,
      imageUrl: "https://placehold.co/400x400/ff6900/white?text=Xiaomi+Watch+S3",
      images: ["https://placehold.co/800x800/ff6900/white?text=Watch+S3"],
      rating: "4.4", reviewCount: 98, inStock: true, stockQuantity: 80, featured: false, isNew: true,
      tags: ["GPS", "AMOLED", "15 jours", "santé"],
      specifications: [
        { group: "Écran", key: "Type", value: "AMOLED 1.43\"" },
        { group: "Batterie", key: "Autonomie", value: "15 jours" },
        { group: "GPS", key: "Systèmes", value: "GPS, GLONASS, Galileo" },
        { group: "Santé", key: "Capteurs", value: "Fréquence cardiaque, SpO2, stress" },
      ]
    },
    {
      name: "Samsung Chargeur 45W Super Fast", nameAr: "شاومي شاحن 45 واط",
      slug: "samsung-chargeur-45w", description: "Chargeur rapide 45W compatible Samsung Galaxy S-series et A-series.",
      price: "3500", originalPrice: "4500", discountPercent: 22,
      categoryId: accessories.id, brandId: samsung.id,
      imageUrl: "https://placehold.co/400x400/1428a0/white?text=Chargeur+45W",
      images: ["https://placehold.co/800x800/1428a0/white?text=Chargeur+45W"],
      rating: "4.5", reviewCount: 445, inStock: true, stockQuantity: 200, featured: false, isNew: false,
      tags: ["45W", "charge rapide", "USB-C"],
      specifications: [
        { group: "Général", key: "Puissance", value: "45W" },
        { group: "Général", key: "Port", value: "USB-C" },
        { group: "Compatibilité", key: "Normes", value: "Super Fast Charging 2.0" },
      ]
    },
  ]).returning();

  console.log("✅ Products seeded");

  // Promotions
  await db.insert(promotionsTable).values([
    {
      title: "Vente Flash Smartphones", titleAr: "تخفيضات الهواتف الذكية",
      description: "Jusqu'à -30% sur une sélection de smartphones Samsung, Xiaomi et Huawei",
      discount: "30%", imageUrl: "https://placehold.co/1200x400/1428a0/white?text=Flash+Smartphones",
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      categoryId: smartphones.id, active: true,
    },
    {
      title: "Promo Ramadan TV & Audio", titleAr: "عروض رمضان على التلفزيون والصوتيات",
      description: "Profitez de nos meilleures offres sur les TV OLED et QLED pendant le Ramadan",
      discount: "20%", imageUrl: "https://placehold.co/1200x400/003087/white?text=Promo+Ramadan+TV",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      categoryId: tvs.id, active: true,
    },
    {
      title: "Rentrée Scolaire Laptops", titleAr: "العودة للمدرسة - اللابتوبات",
      description: "Équipez-vous pour la rentrée avec nos laptops étudiants à prix réduits",
      discount: "15%", imageUrl: "https://placehold.co/1200x400/007db8/white?text=Rentrée+Laptops",
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      categoryId: laptops.id, active: true,
    },
    {
      title: "Été Climatiseurs - Profitez!", titleAr: "صيف المكيفات - استمتع بالبرودة",
      description: "Préparez votre été avec nos climatiseurs Inverter de toutes capacités",
      discount: "12%", imageUrl: "https://placehold.co/1200x400/009900/white?text=Été+Climatiseurs",
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      categoryId: homeAppliances.id, active: true,
    },
  ]).returning();

  console.log("✅ Promotions seeded");

  // Reviews
  const allProducts = [...smartphoneProducts, ...laptopProducts, ...tvProducts, ...applianceProducts, ...gamingProducts, ...accessoriesProducts];
  const reviewData = [
    { authorName: "Karim Benali", rating: 5, title: "Excellent produit !", body: "Très satisfait de mon achat. Livraison rapide à Alger. Le produit est exactement comme décrit.", verified: true },
    { authorName: "Fatima Hadj", rating: 4, title: "Bon rapport qualité-prix", body: "Bon produit dans l'ensemble. La livraison à Oran a pris 3 jours. Emballage soigné.", verified: true },
    { authorName: "Mohamed Kaci", rating: 5, title: "Je recommande vivement", body: "TechMarket DZ est fiable. Produit authentique, prix compétitif. Bravo !", verified: false },
    { authorName: "Amina Boudiaf", rating: 3, title: "Correct mais peut mieux faire", body: "Le produit fonctionne bien mais la livraison a mis plus de temps que prévu.", verified: true },
    { authorName: "Youcef Mansouri", rating: 5, title: "Parfait !", body: "Exactement ce que je cherchais. Service client réactif et livraison dans les délais.", verified: true },
  ];

  for (const product of allProducts.slice(0, 10)) {
    const reviews = reviewData.slice(0, Math.floor(Math.random() * 3) + 2);
    await db.insert(reviewsTable).values(
      reviews.map((r) => ({ ...r, productId: product.id }))
    );
  }

  console.log("✅ Reviews seeded");
  console.log("🎉 Database seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
