import { CartContext, CartProduct } from "@/app/context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/app/utils/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}
export default function CartItem({ product }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative size-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{product.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(product) * product.quantity,
              )}
            </h4>

            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {+formatCurrency(+product.price) * product.quantity}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="size-7 border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={18} />
            </Button>

            <span className="w-4 text-sm">{product.quantity}</span>

            <Button
              size="icon"
              variant="ghost"
              className="size-7 border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="size-8 border border-solid border-muted-foreground"
        onClick={() => removeProductFromCart(product.id)}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}
