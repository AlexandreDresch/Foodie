import { db } from "@/lib/prisma";
import RestaurantItem from "./restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function RestaurantList() {
  const session = await getServerSession(authOptions);

  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });

  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userId={session?.user.id}
          userFavoriteRestaurants={favoriteRestaurants}
        />
      ))}
    </div>
  );
}
