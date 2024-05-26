import { calculateProductTotalPrice, formatCurrency } from "@/app/utils/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Badge from "./badge";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link
      className="w-[130px] min-w-[130px] sm:w-[150px] sm:min-w-[150px] "
      href={`/product/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage > 0 && (
            <Badge
              percentage={product.discountPercentage}
              className="absolute left-2 top-2"
            />
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>

          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>

            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(+product.price)}
              </span>
            )}
          </div>

          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
