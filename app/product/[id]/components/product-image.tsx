"use client";

import { Button } from "@/components/ui/button";
import { Category, Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl"> & {
    category: Pick<Category, "name">;
  };
}

export default function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  const shouldApplyDifferentStyle = product.category.name === "Pizzas";
  const imageClassName = shouldApplyDifferentStyle
    ? "object-scale-down"
    : "md:rounded-lg object-cover";

  function handleGoBack() {
    router.back();
  }

  return (
    <div className="relative h-[360px] w-full md:h-[500px] md:w-1/2">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className={imageClassName}
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground transition-colors hover:text-white md:hidden"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}
