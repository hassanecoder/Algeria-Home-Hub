import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useListBrands } from "@workspace/api-client-react";

export default function Brands() {
  const { data: apiBrands, isLoading } = useListBrands({ query: { retry: false } });

  // Mock brands
  const brands = apiBrands || [
    { id: 1, name: "Samsung", slug: "samsung", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Samsung", description: "Smartphones & TVs", country: "South Korea", productCount: 150, featured: true },
    { id: 2, name: "LG", slug: "lg", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=LG", description: "TVs & Appliances", country: "South Korea", productCount: 85, featured: true },
    { id: 3, name: "Apple", slug: "apple", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Apple", description: "Premium Tech", country: "USA", productCount: 45, featured: true },
    { id: 4, name: "Xiaomi", slug: "xiaomi", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Xiaomi", description: "Smartphones & Smart Home", country: "China", productCount: 120, featured: true },
    { id: 5, name: "Condor", slug: "condor", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Condor", description: "Local Algerian Brand", country: "Algeria", productCount: 200, featured: true },
    { id: 6, name: "Sony", slug: "sony", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Sony", description: "Gaming & Audio", country: "Japan", productCount: 60, featured: true },
    { id: 7, name: "Lenovo", slug: "lenovo", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Lenovo", description: "Laptops", country: "China", productCount: 50, featured: false },
    { id: 8, name: "Iris", slug: "iris", logoUrl: "https://placehold.co/200x100/ffffff/000000?text=Iris", description: "Algerian Electronics", country: "Algeria", productCount: 90, featured: true },
  ];

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Nos Marques Partenaires</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Découvrez les meilleures marques mondiales et locales, garanties 100% originales sur TechMarket Algeria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse"></div>
            ))
          ) : (
            brands.map((brand) => (
              <Link 
                key={brand.id} 
                href={`/products?brand=${brand.slug}`}
                className="group flex flex-col items-center justify-center p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-full h-20 relative flex items-center justify-center mb-4">
                  <img src={brand.logoUrl} alt={brand.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-lg">{brand.name}</h3>
                <span className="text-sm text-muted-foreground">{brand.productCount} produits</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
