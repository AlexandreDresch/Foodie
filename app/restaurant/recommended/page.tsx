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
      <div className="p-5 lg:px-28">
        <Heading title="Best Restaurants" />
        <div className="mt-5 flex w-full flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
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
