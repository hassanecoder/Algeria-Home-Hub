import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { formatDZD } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useGetCart } from "@workspace/api-client-react";
import { useCartActions } from "@/hooks/use-cart-actions";

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { data: cart, isLoading } = useGetCart({ query: { retry: false } });
  const { updateQuantity, removeItem, clearCart, isUpdating, isRemoving } = useCartActions();

  // Handle empty state
  if (!isLoading && (!cart || !cart.items || cart.items.length === 0)) {
    return (
      <Layout>
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-muted/20">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Vous n'avez ajouté aucun article à votre panier. Découvrez nos produits et promotions.
          </p>
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/products">Continuer vos achats</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-32 bg-muted rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/50 text-sm font-semibold text-muted-foreground">
                  <div className="col-span-6">Produit</div>
                  <div className="col-span-3 text-center">Quantité</div>
                  <div className="col-span-3 text-right">Sous-total</div>
                </div>

                <div className="divide-y divide-border">
                  {cart?.items.map((item) => (
                    <div key={item.productId} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
                      {/* Mobile delete button */}
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="sm:hidden absolute top-4 right-4 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <Link href={`/products/${item.productId}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-xl p-2 shrink-0 border border-border">
                          <img 
                            src={item.imageUrl || `https://placehold.co/200/1a1a2e/white?text=Product`} 
                            alt={item.productName} 
                            className="w-full h-full object-contain"
                          />
                        </Link>
                        <div className="flex flex-col pr-6 sm:pr-0">
                          <span className="text-xs text-muted-foreground uppercase font-bold mb-1">{item.brandName}</span>
                          <Link href={`/products/${item.productId}`} className="font-bold hover:text-primary transition-colors line-clamp-2">
                            {item.productName}
                          </Link>
                          <span className="text-primary font-bold mt-1 sm:hidden">
                            {formatDZD(item.price)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-3 flex justify-center mt-4 sm:mt-0">
                        <div className="flex items-center border border-input rounded-lg bg-background w-32 h-10 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            disabled={isUpdating}
                            className="px-3 h-full text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="flex-1 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={isUpdating}
                            className="px-3 h-full text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 sm:col-span-3 flex items-center justify-between sm:justify-end">
                        <span className="sm:hidden font-semibold text-muted-foreground">Total:</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">{formatDZD(item.subtotal)}</span>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            disabled={isRemoving}
                            className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => clearCart()} className="text-muted-foreground">
                Vider le panier
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/products">Continuer les achats</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 lg:p-8 rounded-3xl border border-border shadow-md sticky top-28">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total ({cart?.itemCount} articles)</span>
                  <span className="font-medium text-foreground">{cart ? formatDZD(cart.subtotal) : '0 DA'}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frais de livraison estimé</span>
                  <span className="font-medium text-foreground">
                    {cart?.deliveryFee === 0 ? <span className="text-green-600 font-bold">Gratuit</span> : cart ? formatDZD(cart.deliveryFee) : '0 DA'}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Total TTC</span>
                  <span className="text-3xl font-extrabold text-primary">{cart ? formatDZD(cart.total) : '0 DA'}</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 text-lg rounded-xl mb-4 shadow-primary/30"
                onClick={() => setLocation("/checkout")}
              >
                Passer la commande <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Paiement 100% sécurisé à la livraison
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
