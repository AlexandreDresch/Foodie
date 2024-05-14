"use client";

import { CartContext } from "@/app/context/cart";
import { formatCurrency } from "@/app/utils/price";
import Cart from "@/components/cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

export default function CartBanner({ restaurant }: CartBannerProps) {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (p) => p.restaurantId === restaurant.id,
  );

  console.log(restaurantHasProductsOnCart);

  if (!restaurantHasProductsOnCart) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Total:</span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs text-muted-foreground">
              /{totalQuantity} {totalQuantity > 1 ? "items" : "item"}
            </span>
          </h3>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button>Open Cart</Button>
          </SheetTrigger>
          <SheetContent className="w-[85vw]">
            <SheetHeader className="text-left">
              <SheetTitle>Cart</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
