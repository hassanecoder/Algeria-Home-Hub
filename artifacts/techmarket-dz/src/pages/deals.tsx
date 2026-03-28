import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { useListPromotions, useListProducts } from "@workspace/api-client-react";
import { Timer, Zap } from "lucide-react";

export default function Deals() {
  const { data: promotions } = useListPromotions({ query: { retry: false } });
  
  // Use products with discount as deals
  const { data: productsData } = useListProducts({ onSale: true }, { query: { retry: false } });

  const mockProducts = [
    { id: 2, name: "LG OLED C3 65\"", nameAr: "تلفاز ال جي اوليد 65 بوصة", slug: "lg-oled-c3", description: "", price: 340000, originalPrice: 380000, discountPercent: 10, categoryId: 3, categoryName: "TVs", brandId: 2, brandName: "LG", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=LG+OLED", images: [], rating: 4.9, reviewCount: 56, inStock: true, stockQuantity: 15, featured: true, isNew: false, tags: [], createdAt: "" },
    { id: 7, name: "Airpods Pro 2", nameAr: "سماعات أبل إيربودز برو", slug: "airpods-pro-2", description: "", price: 42000, originalPrice: 50000, discountPercent: 16, categoryId: 6, categoryName: "Accessories", brandId: 3, brandName: "Apple", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=Airpods", images: [], rating: 4.8, reviewCount: 88, inStock: true, stockQuantity: 20, featured: false, isNew: false, tags: [], createdAt: "" },
  ];

  const deals = productsData?.products || mockProducts;

  return (
    <Layout>
      <div className="bg-destructive text-destructive-foreground py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ventes Flash & Promotions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Profitez des meilleures réductions sur l'électronique avant épuisement du stock !
          </p>
          
          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl">
            <Timer className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Finit dans</div>
              <div className="text-2xl font-mono font-bold">12:45:30</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
