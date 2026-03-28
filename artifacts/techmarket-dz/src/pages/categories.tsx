import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useListCategories } from "@workspace/api-client-react";
import { Smartphone, Laptop, Tv, Coffee, Gamepad2, Headphones, Watch, Camera } from "lucide-react";

export default function Categories() {
  const { data: apiCategories, isLoading } = useListCategories({ query: { retry: false } });

  // Map backend string icon names to Lucide components if needed
  const iconMap: Record<string, any> = {
    smartphone: Smartphone,
    laptop: Laptop,
    tv: Tv,
    appliances: Coffee,
    gaming: Gamepad2,
    accessories: Headphones,
    watch: Watch,
    camera: Camera
  };

  const categories = apiCategories || [
    { id: 1, name: "Smartphones & Tablettes", nameAr: "هواتف ذكية وأجهزة لوحية", slug: "smartphones", description: "Les derniers téléphones au meilleur prix", icon: "smartphone", productCount: 450, subcategories: [] },
    { id: 2, name: "PC & Laptops", nameAr: "حواسيب محمولة", slug: "laptops", description: "Ordinateurs de bureau, portables et composants", icon: "laptop", productCount: 320, subcategories: [] },
    { id: 3, name: "TV & Audio", nameAr: "تلفاز وصوتيات", slug: "tvs", description: "Téléviseurs intelligents, barres de son, home cinéma", icon: "tv", productCount: 180, subcategories: [] },
    { id: 4, name: "Électroménager", nameAr: "أجهزة كهرومنزلية", slug: "appliances", description: "Réfrigérateurs, machines à laver, climatiseurs", icon: "appliances", productCount: 600, subcategories: [] },
    { id: 5, name: "Gaming", nameAr: "ألعاب الفيديو", slug: "gaming", description: "Consoles, jeux, accessoires gaming", icon: "gaming", productCount: 150, subcategories: [] },
    { id: 6, name: "Accessoires", nameAr: "إكسسوارات", slug: "accessories", description: "Câbles, chargeurs, étuis, power banks", icon: "accessories", productCount: 890, subcategories: [] },
    { id: 7, name: "Objets Connectés", nameAr: "أجهزة متصلة", slug: "smartwatch", description: "Montres intelligentes, bracelets connectés", icon: "watch", productCount: 110, subcategories: [] },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl font-extrabold mb-4">Toutes les Catégories</h1>
        <p className="text-xl text-muted-foreground mb-12">Parcourez notre vaste catalogue de produits électroniques.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-3xl animate-pulse"></div>
            ))
          ) : (
            categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Smartphone;
              return (
                <Link 
                  key={cat.id} 
                  href={`/products?category=${cat.slug}`}
                  className="group relative overflow-hidden bg-card rounded-3xl border border-border p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-1 relative z-10">{cat.name}</h2>
                  <h3 className="font-arabic text-muted-foreground mb-4 relative z-10" dir="rtl">{cat.nameAr}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 relative z-10">
                    {cat.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-primary relative z-10">
                    Voir les {cat.productCount} produits &rarr;
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
