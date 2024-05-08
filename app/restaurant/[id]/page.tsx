import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "../components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/components/delivery-info";
import Heading from "@/components/heading";
import ProductList from "@/components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      products: { include: { restaurant: true } },
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 -mt-[1.5rem] flex items-center justify-between rounded-xl bg-white px-5 pt-5">
        <div className="flex items-center gap-1.5">
          <div className="relative size-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-0.5 text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="text-xs font-semibold text-white">5.0</span>
        </div>
      </div>

      <div className="p-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="flex min-w-[167px] items-center justify-center rounded-lg bg-[#F4F4F4]"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <Heading title="Customer Favorites" className="px-5" />

        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => {
        return (
          <div key={category.id} className="mt-5 space-y-2">
            <Heading title={category.name} className="px-5" />

            <ProductList products={category.products} />
          </div>
        );
      })}
    </div>
  );
}
