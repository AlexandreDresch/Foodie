import Header from "@/components/header";
import Heading from "@/components/heading";
import ProductItem from "@/components/product-item";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({
  params: { id },
}: CategoryPageProps) {
  const category = await db.category.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5 lg:px-28">
        <Heading title={category.name} className="mb-5" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {category.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
