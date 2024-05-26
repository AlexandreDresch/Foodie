import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./components/product-image";
import ProductDetails from "./components/product-details";
import Header from "@/components/header";
import Heading from "@/components/heading";
import ProductList from "@/components/product-list";

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
    include: { restaurant: true, category: { select: { name: true } } },
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
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="md:mt-5 md:px-5 lg:px-28">
        <div className="gap-5 md:flex md:justify-between">
          <ProductImage product={product} />

          <ProductDetails
            product={product}
            complementaryProducts={complementaryProducts}
          />
        </div>

        <div className="mt-10 hidden space-y-2 px-5 md:block md:px-0">
          <Heading title={`More from ${product.restaurant.name}`} />

          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </>
  );
}
