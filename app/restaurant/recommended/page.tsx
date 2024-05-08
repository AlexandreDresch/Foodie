import Header from "@/components/header";
import Heading from "@/components/heading";
import RestaurantItem from "@/components/restaurant-item";
import { db } from "@/lib/prisma";

export default async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="p-5">
        <Heading title="Best Restaurants" className="mb-5" />
        <div className="flex w-full flex-col space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
