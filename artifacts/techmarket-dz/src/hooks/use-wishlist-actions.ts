import { useQueryClient } from "@tanstack/react-query";
import { 
  useAddToWishlist, 
  useRemoveFromWishlist,
  getGetWishlistQueryKey
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function useWishlistActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const wishlistQueryKey = getGetWishlistQueryKey();

  const addToWishlistMutation = useAddToWishlist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistQueryKey });
        toast({
          title: "Saved to wishlist",
          description: "Item added to your wishlist.",
        });
      }
    }
  });

  const removeFromWishlistMutation = useRemoveFromWishlist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistQueryKey });
      }
    }
  });

  return {
    addToWishlist: (productId: number) => 
      addToWishlistMutation.mutate({ data: { productId } }),
    removeFromWishlist: (productId: number) => 
      removeFromWishlistMutation.mutate({ productId }),
    isAdding: addToWishlistMutation.isPending,
    isRemoving: removeFromWishlistMutation.isPending,
  };
}
