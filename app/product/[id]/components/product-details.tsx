"use client";

import { calculateProductTotalPrice, formatCurrency } from "@/app/utils/price";
import Badge from "@/components/badge";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export default function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity((currentState) => currentState - 1);
    }
  }

  function handleIncreaseQuantity() {
    setQuantity((currentState) => currentState + 1);
  }

  return (
    <div className="relative z-50 -mt-[1.5rem] rounded-t-xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <div className="relative size-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <Badge percentage={product.discountPercentage} />
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(+product.price)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>

          <span className="w-4">{quantity}</span>

          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
            onClick={handleIncreaseQuantity}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <Card className="mx-5 mt-6 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BikeIcon size={14} />
            <span className="text-xs">Delivery Fee</span>
          </div>

          <p className="text-xs font-semibold">
            {+product.restaurant.deliveryFee === 0
              ? "Free"
              : formatCurrency(+product.restaurant.deliveryFee)}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TimerIcon size={14} />
            <span className="text-xs">Delivery Time</span>
          </div>

          <p className="text-xs font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Description</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">
          More from {product.restaurant.name}
        </h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="flex w-full gap-2">
          <ShoppingCartIcon size={18} />
          <span className="font-semibold">Add to Cart</span>
        </Button>
      </div>
    </div>
  );
}
