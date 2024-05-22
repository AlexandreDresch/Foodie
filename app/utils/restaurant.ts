import { UserFavoriteRestaurant } from "@prisma/client";

export function isRestaurantFavorite(
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
): boolean {
  return userFavoriteRestaurants.some(
    (favoriteRestaurant) => favoriteRestaurant.restaurantId === restaurantId,
  );
}
