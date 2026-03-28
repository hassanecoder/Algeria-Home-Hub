import { Link } from "wouter";
import { ShoppingCart, Heart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDZD, cn } from "@/lib/utils";
import { type Product } from "@workspace/api-client-react";
import { useCartActions } from "@/hooks/use-cart-actions";
import { useWishlistActions } from "@/hooks/use-wishlist-actions";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, isAdding } = useCartActions();
  const { addToWishlist, isAdding: isAddingWishlist } = useWishlistActions();

  // Handle mock image if the API one fails or is empty
  const imageUrl = product.imageUrl || `https://placehold.co/400x400/1a1a2e/white?text=${encodeURIComponent(product.name)}`;

  return (
    <div className={cn(
      "group relative flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden",
      className
    )}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discountPercent && (
          <Badge variant="destructive" className="font-bold">
            -{product.discountPercent}%
          </Badge>
        )}
        {product.isNew && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-none">
            Nouveau
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.preventDefault(); addToWishlist(product.id); }}
        disabled={isAddingWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-all"
      >
        <Heart className="w-5 h-5" />
      </button>

      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50 p-6">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-grow p-5">
        <div className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">
          {product.brandName}
        </div>
        
        <Link href={`/products/${product.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-bold text-base line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="font-arabic text-sm text-muted-foreground mt-1 line-clamp-1" dir="rtl">
            {product.nameAr}
          </div>
        </Link>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-2 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-300")} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-lg font-bold text-primary">
              {formatDZD(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {formatDZD(product.originalPrice)}
              </div>
            )}
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full w-10 h-10 shadow-md hover:scale-110 active:scale-95 transition-transform"
            disabled={!product.inStock || isAdding}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, 1);
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
