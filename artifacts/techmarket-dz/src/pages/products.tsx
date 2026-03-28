import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useListProducts, type ListProductsSortBy } from "@workspace/api-client-react";

export default function Products() {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ListProductsSortBy>("popular");

  // Call API
  const { data, isLoading } = useListProducts({ 
    category: selectedCategories.join(",") || undefined,
    brand: selectedBrands.join(",") || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    inStock: inStockOnly || undefined,
    sortBy: sortBy,
    search: searchParams.get("search") || undefined
  }, { query: { retry: false } });

  // Mock data fallback
  const mockProducts = [
    { id: 1, name: "Samsung Galaxy S24 Ultra", nameAr: "سامسونج جالاكسي اس 24 الترا", slug: "s24-ultra", description: "", price: 235000, categoryId: 1, categoryName: "Smartphones", brandId: 1, brandName: "Samsung", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=S24+Ultra", images: [], rating: 4.8, reviewCount: 124, inStock: true, stockQuantity: 50, featured: true, isNew: true, tags: [], createdAt: "" },
    { id: 2, name: "LG OLED C3 65\"", nameAr: "تلفاز ال جي اوليد 65 بوصة", slug: "lg-oled-c3", description: "", price: 340000, originalPrice: 380000, discountPercent: 10, categoryId: 3, categoryName: "TVs", brandId: 2, brandName: "LG", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=LG+OLED", images: [], rating: 4.9, reviewCount: 56, inStock: true, stockQuantity: 15, featured: true, isNew: false, tags: [], createdAt: "" },
    { id: 5, name: "Condor Réfrigérateur No Frost", nameAr: "ثلاجة كوندور", slug: "condor-fridge", description: "", price: 85000, categoryId: 4, categoryName: "Appliances", brandId: 5, brandName: "Condor", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=Fridge", images: [], rating: 4.2, reviewCount: 12, inStock: true, stockQuantity: 30, featured: false, isNew: false, tags: [], createdAt: "" },
    { id: 6, name: "Xiaomi Redmi Note 13", nameAr: "شاومي ريدمي نوت 13", slug: "redmi-13", description: "", price: 45000, categoryId: 1, categoryName: "Smartphones", brandId: 6, brandName: "Xiaomi", imageUrl: "https://placehold.co/400x400/1a1a2e/white?text=Redmi+13", images: [], rating: 4.5, reviewCount: 200, inStock: true, stockQuantity: 150, featured: true, isNew: false, tags: [], createdAt: "" },
  ];

  const products = data?.products || mockProducts;
  const isSearch = !!searchParams.get("search");

  return (
    <Layout>
      <div className="bg-muted py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">
            {isSearch ? `Résultats pour "${searchParams.get("search")}"` : "Tous les Produits"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {products.length} produits trouvés
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filtres
                </h3>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Prix (DZD)</h4>
                <Slider 
                  defaultValue={[0, 500000]} 
                  max={1000000} 
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8 border-t border-border pt-6">
                <h4 className="font-semibold mb-4">Catégories</h4>
                <div className="space-y-3">
                  {["Smartphones", "Laptops", "TVs", "Appliances", "Gaming"].map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`cat-${cat}`} 
                        checked={selectedCategories.includes(cat.toLowerCase())}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedCategories([...selectedCategories, cat.toLowerCase()]);
                          else setSelectedCategories(selectedCategories.filter(c => c !== cat.toLowerCase()));
                        }}
                      />
                      <Label htmlFor={`cat-${cat}`} className="font-normal cursor-pointer">{cat}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8 border-t border-border pt-6">
                <h4 className="font-semibold mb-4">Marques</h4>
                <div className="space-y-3">
                  {["Samsung", "Apple", "LG", "Xiaomi", "Condor", "Sony"].map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand.toLowerCase())}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedBrands([...selectedBrands, brand.toLowerCase()]);
                          else setSelectedBrands(selectedBrands.filter(b => b !== brand.toLowerCase()));
                        }}
                      />
                      <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Options */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="instock" 
                    checked={inStockOnly}
                    onCheckedChange={(c) => setInStockOnly(c as boolean)}
                  />
                  <Label htmlFor="instock" className="font-normal cursor-pointer">En stock uniquement</Label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Trier par:</span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <select 
                  className="bg-background border-2 border-input rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as ListProductsSortBy)}
                >
                  <option value="popular">Plus populaires</option>
                  <option value="newest">Nouveautés</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Meilleur note</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-6">Essayez de modifier vos filtres ou votre recherche.</p>
                <Button onClick={() => {
                  setPriceRange([0, 500000]);
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setInStockOnly(false);
                }}>Réinitialiser les filtres</Button>
              </div>
            )}

            {/* Pagination Placeholder */}
            {products.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button variant="outline" disabled>Précédent</Button>
                  <Button className="w-12">1</Button>
                  <Button variant="outline" className="w-12">2</Button>
                  <Button variant="outline" className="w-12">3</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
