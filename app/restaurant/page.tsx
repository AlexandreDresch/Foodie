import { Suspense } from "react";
import Restaurants from "./components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions);

  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={favoriteRestaurants} />
    </Suspense>
  );
}
