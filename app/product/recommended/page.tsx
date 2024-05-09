import Header from "@/components/header";
import Heading from "@/components/heading";
import ProductItem from "@/components/product-item";
import { db } from "@/lib/prisma";

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="p-5">
        <Heading title="Best Restaurants" className="mb-5" />
        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
