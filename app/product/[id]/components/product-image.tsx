"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export default function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground transition-colors hover:text-white"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}
