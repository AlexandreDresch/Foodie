import Header from "@/components/header";
import Heading from "@/components/heading";
import RestaurantItem from "@/components/restaurant-item";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany({});
  const session = await getServerSession(authOptions);

  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <>
      <Header />
      <div className="p-5">
        <Heading title="Best Restaurants" className="mb-5" />
        <div className="flex w-full flex-col space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userFavoriteRestaurants={favoriteRestaurants}
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
