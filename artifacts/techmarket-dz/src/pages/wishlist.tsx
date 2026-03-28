import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { useGetWishlist } from "@workspace/api-client-react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const { data: wishlist, isLoading } = useGetWishlist({ query: { retry: false } });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-grow flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-destructive fill-destructive" />
          <h1 className="text-3xl font-bold">Ma Liste de Souhaits</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : !wishlist || wishlist.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 text-center bg-card rounded-3xl border border-border">
            <div className="w-24 h-24 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Votre liste est vide</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Sauvegardez vos produits préférés ici pour les retrouver plus facilement plus tard.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/products">Explorer les produits</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
