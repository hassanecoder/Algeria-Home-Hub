import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { ArrowRight, Smartphone, Laptop, Tv, Coffee, Gamepad2, Headphones, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { useGetFeaturedProducts, useGetNewArrivals } from "@workspace/api-client-react";

export default function Home() {
  // Mock data fallback if API fails
  const { data: featured = [] } = useGetFeaturedProducts({ query: { retry: false } });
  const { data: newArrivals = [] } = useGetNewArrivals({ query: { retry: false } });

  const mockProducts = [
    { id: 1, name: "Samsung Galaxy S24 Ultra", nameAr: "سامسونج جالاكسي اس 24 الترا", slug: "s24-ultra", description: "", price: 235000, categoryId: 1, categoryName: "Smartphones", brandId: 1, brandName: "Samsung", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=S24+Ultra", images: [], rating: 4.8, reviewCount: 124, inStock: true, stockQuantity: 50, featured: true, isNew: true, tags: [], createdAt: "" },
    { id: 2, name: "LG OLED C3 65\"", nameAr: "تلفاز ال جي اوليد 65 بوصة", slug: "lg-oled-c3", description: "", price: 340000, originalPrice: 380000, discountPercent: 10, categoryId: 3, categoryName: "TVs", brandId: 2, brandName: "LG", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=LG+OLED", images: [], rating: 4.9, reviewCount: 56, inStock: true, stockQuantity: 15, featured: true, isNew: false, tags: [], createdAt: "" },
    { id: 3, name: "MacBook Pro M3 14\"", nameAr: "ماك بوك برو ام 3", slug: "macbook-m3", description: "", price: 420000, categoryId: 2, categoryName: "Laptops", brandId: 3, brandName: "Apple", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=MacBook+Pro", images: [], rating: 5.0, reviewCount: 89, inStock: true, stockQuantity: 10, featured: true, isNew: true, tags: [], createdAt: "" },
    { id: 4, name: "Sony PlayStation 5", nameAr: "بلاي ستيشن 5", slug: "ps5", description: "", price: 125000, categoryId: 5, categoryName: "Gaming", brandId: 4, brandName: "Sony", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=PS5", images: [], rating: 4.9, reviewCount: 340, inStock: true, stockQuantity: 100, featured: false, isNew: false, tags: [], createdAt: "" },
  ];

  const displayFeatured = featured.length > 0 ? featured : mockProducts;
  const displayNew = newArrivals.length > 0 ? newArrivals : mockProducts.slice(0, 4).reverse();

  const categories = [
    { name: "Smartphones", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
    { name: "PC & Laptops", icon: Laptop, color: "bg-indigo-100 text-indigo-600" },
    { name: "TV & Audio", icon: Tv, color: "bg-purple-100 text-purple-600" },
    { name: "Électroménager", icon: Coffee, color: "bg-orange-100 text-orange-600" },
    { name: "Gaming", icon: Gamepad2, color: "bg-red-100 text-red-600" },
    { name: "Accessoires", icon: Headphones, color: "bg-teal-100 text-teal-600" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-muted overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Arrivage S24 Ultra
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              La Technologie <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                À Votre Portée
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg font-medium leading-relaxed">
              Découvrez les dernières nouveautés en smartphones, PC, et électroménager en Algérie. Livraison express 58 Wilayas.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild className="rounded-full">
                <Link href="/products">Découvrir</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full bg-background/50 backdrop-blur">
                <Link href="/deals">Voir les Promos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex items-center gap-4 md:px-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Livraison Rapide</h4>
                <p className="text-sm text-muted-foreground">Sur les 58 Wilayas d'Algérie</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-4 pt-8 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Garantie Officielle</h4>
                <p className="text-sm text-muted-foreground">Produits 100% originaux</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-4 pt-8 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Paiement Flexible</h4>
                <p className="text-sm text-muted-foreground">À la livraison ou par carte CIB/Edahabia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">Catégories Populaires</h2>
              <p className="text-muted-foreground mt-2">Trouvez ce que vous cherchez</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex" asChild>
              <Link href="/categories">Tout voir <ArrowRight className="w-4 h-4 ml-2"/></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} className="group flex flex-col items-center justify-center p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${cat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="font-semibold text-center text-sm">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Produits Phares</h2>
            <Button variant="ghost" asChild>
              <Link href="/products?featured=true">Voir plus <ArrowRight className="w-4 h-4 ml-2"/></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFeatured.map((product) => (
              <ProductCard key={`featured-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <img src={`${import.meta.env.BASE_URL}images/promo-banner.png`} alt="Promo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center text-white">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Mégapromo Électroménager</h2>
              <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl opacity-90">Jusqu'à -30% sur une large sélection de réfrigérateurs, machines à laver et climatiseurs.</p>
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-100" asChild>
                <Link href="/deals">Profiter de l'offre</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Nouveaux Arrivages</h2>
            <Button variant="ghost" asChild>
              <Link href="/products?sort=newest">Voir plus <ArrowRight className="w-4 h-4 ml-2"/></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayNew.map((product) => (
              <ProductCard key={`new-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
