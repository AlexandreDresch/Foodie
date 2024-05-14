import { CartContext } from "@/app/context/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/app/utils/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Cart() {
  const { products, subtotalPrice, totalPrice, discountTotal } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>

                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Discounts</span>

                  <span>- {formatCurrency(discountTotal)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Delivery Fee</span>

                  <span>
                    {+products[0].restaurant.deliveryFee === 0 ? (
                      <span className="uppercase text-primary">Free</span>
                    ) : (
                      formatCurrency(+products[0].restaurant.deliveryFee)
                    )}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>

                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="mt-6 w-full">Place order</Button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}
