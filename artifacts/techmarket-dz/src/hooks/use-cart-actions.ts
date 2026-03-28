import { useQueryClient } from "@tanstack/react-query";
import { 
  useAddToCart, 
  useRemoveFromCart, 
  useUpdateCartItem,
  useClearCart,
  getGetCartQueryKey
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function useCartActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const cartQueryKey = getGetCartQueryKey();

  const addToCartMutation = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartQueryKey });
        toast({
          title: "Added to cart",
          description: "Item successfully added to your shopping cart.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  const updateCartItemMutation = useUpdateCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartQueryKey });
      }
    }
  });

  const removeFromCartMutation = useRemoveFromCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartQueryKey });
        toast({
          title: "Item removed",
          description: "Item removed from your cart.",
        });
      }
    }
  });

  const clearCartMutation = useClearCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartQueryKey });
      }
    }
  });

  return {
    addToCart: (productId: number, quantity: number = 1) => 
      addToCartMutation.mutate({ data: { productId, quantity } }),
    updateQuantity: (productId: number, quantity: number) => 
      updateCartItemMutation.mutate({ productId, data: { quantity } }),
    removeItem: (productId: number) => 
      removeFromCartMutation.mutate({ productId }),
    clearCart: () => clearCartMutation.mutate(),
    isAdding: addToCartMutation.isPending,
    isUpdating: updateCartItemMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
  };
}
