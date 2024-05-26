import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./components/product-image";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}
export default async function ProductsPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  });

  if (!product) {
    return notFound();
  }

  const complementaryProducts = await db.product.findMany({
    where: {
      restaurant: { id: product.restaurant.id },
      id: { not: product.id },
    },
    take: 10,
    include: { restaurant: true },
  });

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails
        product={product}
        complementaryProducts={complementaryProducts}
      />
    </div>
  );
}
