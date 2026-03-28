import { useState } from "react";
import { useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDZD } from "@/lib/utils";
import { ShoppingCart, Heart, Share2, Truck, Shield, Star, Minus, Plus, Check } from "lucide-react";
import { useGetProduct } from "@workspace/api-client-react";
import { useCartActions } from "@/hooks/use-cart-actions";
import { useWishlistActions } from "@/hooks/use-wishlist-actions";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || "1", 10);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  const { addToCart, isAdding } = useCartActions();
  const { addToWishlist, isAdding: isAddingWishlist } = useWishlistActions();

  // Try API, fallback to rich mock data
  const { data: apiProduct, isLoading } = useGetProduct(productId, { query: { retry: false } });

  const mockProduct = {
    id: productId,
    name: "Samsung Galaxy S24 Ultra 256GB Titanium Gray",
    nameAr: "سامسونج جالاكسي اس 24 الترا 256 جيجا رمادي تيتانيوم",
    slug: "s24-ultra",
    description: "Le smartphone ultime avec Intelligence Artificielle intégrée. Boîtier en titane ultra résistant, écran Dynamic AMOLED 2X de 6.8 pouces, processeur Snapdragon 8 Gen 3 for Galaxy, et un système d'appareil photo professionnel avec capteur principal de 200 Mpx.",
    price: 235000,
    originalPrice: 250000,
    discountPercent: 6,
    categoryId: 1,
    categoryName: "Smartphones",
    brandId: 1,
    brandName: "Samsung",
    imageUrl: `https://placehold.co/800x800/1a1a2e/white?text=S24+Ultra`,
    images: [
      `https://placehold.co/800x800/1a1a2e/white?text=S24+Ultra+Front`,
      `https://placehold.co/800x800/1a1a2e/white?text=S24+Ultra+Back`,
      `https://placehold.co/800x800/1a1a2e/white?text=S24+Ultra+Side`,
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockQuantity: 50,
    featured: true,
    isNew: true,
    tags: ["5G", "AI", "Titanium"],
    createdAt: new Date().toISOString(),
    specifications: [
      { group: "Écran", key: "Taille", value: "6.8 pouces" },
      { group: "Écran", key: "Type", value: "Dynamic AMOLED 2X, 120Hz" },
      { group: "Performances", key: "Processeur", value: "Snapdragon 8 Gen 3" },
      { group: "Performances", key: "RAM", value: "12 Go" },
      { group: "Stockage", key: "Capacité", value: "256 Go" },
      { group: "Appareil Photo", key: "Principal", value: "200 Mpx" },
      { group: "Batterie", key: "Capacité", value: "5000 mAh" },
    ],
    relatedProducts: []
  };

  const product = apiProduct || mockProduct;
  const [activeImage, setActiveImage] = useState(product.imageUrl);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 w-full animate-pulse">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 h-[500px] bg-muted rounded-3xl"></div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded w-3/4"></div>
              <div className="h-24 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categoryName}`} className="hover:text-primary transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="aspect-square bg-white rounded-3xl border border-border p-8 relative overflow-hidden flex items-center justify-center shadow-sm">
              <img src={activeImage} alt={product.name} className="max-w-full max-h-full object-contain" />
              {product.discountPercent && (
                <Badge variant="destructive" className="absolute top-6 left-6 text-sm py-1 px-3">
                  -{product.discountPercent}%
                </Badge>
              )}
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                <button 
                  onClick={() => setActiveImage(product.imageUrl)}
                  className={`w-20 h-20 rounded-xl border-2 p-2 bg-white flex-shrink-0 transition-all ${activeImage === product.imageUrl ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
                >
                  <img src={product.imageUrl} className="w-full h-full object-contain" />
                </button>
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl border-2 p-2 bg-white flex-shrink-0 transition-all ${activeImage === img ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
                  >
                    <img src={img} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-2">
              <Link href={`/brands/${product.brandId}`} className="text-primary font-bold tracking-widest uppercase text-sm hover:underline">
                {product.brandName}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-2">
              {product.name}
            </h1>
            <h2 className="text-xl font-arabic text-muted-foreground mb-6" dir="rtl">
              {product.nameAr}
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <a href="#reviews" className="text-sm text-primary hover:underline font-medium">
                {product.reviewCount} avis clients
              </a>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span className={`text-sm font-bold flex items-center gap-1 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? <><Check className="w-4 h-4"/> En stock</> : 'Rupture de stock'}
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-extrabold text-primary">
                  {formatDZD(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through mb-1">
                    {formatDZD(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center border-2 border-input rounded-xl bg-background w-fit h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg rounded-xl"
                disabled={!product.inStock || isAdding}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? "Ajout en cours..." : "Ajouter au panier"}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-xl shrink-0"
                onClick={() => addToWishlist(product.id)}
                disabled={isAddingWishlist}
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Truck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Livraison 58 Wilayas</div>
                  <div className="text-xs text-muted-foreground">Gratuite à partir de 5000 DA</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Shield className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Garantie 12 Mois</div>
                  <div className="text-xs text-muted-foreground">Service après-vente officiel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 md:mt-24">
          <div className="flex border-b border-border overflow-x-auto hide-scrollbar">
            <button 
              className={`pb-4 px-6 text-lg font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('description')}
            >
              Description détaillée
            </button>
            <button 
              className={`pb-4 px-6 text-lg font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('specs')}
            >
              Fiche technique
            </button>
            <button 
              className={`pb-4 px-6 text-lg font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Avis ({product.reviewCount})
            </button>
          </div>

          <div className="py-8 min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>{product.description}</p>
                <p>Découvrez la puissance de la technologie avec ce produit exceptionnel de la marque {product.brandName}. Conçu pour répondre aux besoins des utilisateurs les plus exigeants en Algérie.</p>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="border border-border rounded-xl overflow-hidden">
                    {product.specifications.map((spec: any, idx: number) => (
                      <div key={idx} className={`flex flex-col sm:flex-row border-b border-border last:border-0 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                        <div className="w-full sm:w-1/3 p-4 font-semibold text-foreground bg-muted/50">{spec.key}</div>
                        <div className="w-full sm:w-2/3 p-4 text-muted-foreground">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aucune spécification disponible.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews" className="max-w-4xl">
                <div className="bg-card p-6 rounded-2xl border border-border flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-primary mb-2">{product.rating.toFixed(1)}</div>
                    <div className="flex text-amber-400 mb-2 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Basé sur {product.reviewCount} avis</div>
                  </div>
                  <div className="flex-1 w-full">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-3 mb-2">
                        <div className="w-12 text-sm font-medium text-right">{star} <Star className="w-3 h-3 inline fill-current text-amber-400 -mt-1"/></div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${star > 3 ? 80 : star * 10}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mock Review */}
                <div className="border-b border-border pb-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">Amine B.</div>
                    <div className="text-sm text-muted-foreground">Il y a 2 jours</div>
                  </div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <h4 className="font-bold mb-2">Excellent produit !</h4>
                  <p className="text-muted-foreground">La livraison a été très rapide sur Alger, le produit est conforme à la description et original. Très satisfait de mon achat chez TechMarket.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
