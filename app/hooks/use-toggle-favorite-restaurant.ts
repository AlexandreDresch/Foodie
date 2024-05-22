import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../actions/restaurant";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsCurrentlyFavorite: boolean;
  path: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function useToggleFavoriteRestaurant({
  userId,
  restaurantId,
  restaurantIsCurrentlyFavorite,
  path,
  onSuccess,
  onFailure,
}: UseToggleFavoriteRestaurantProps) {
  function handleFavoriteToggle() {
    if (restaurantIsCurrentlyFavorite) {
      handleUnfavorite();
    } else {
      handleFavorite();
    }
  }

  async function handleFavorite() {
    if (!userId) {
      return;
    }

    try {
      await favoriteRestaurant(userId, restaurantId, path);
      onSuccess?.();
    } catch (error) {
      onFailure?.();
    }
  }

  async function handleUnfavorite() {
    if (!userId) {
      return;
    }

    try {
      await unfavoriteRestaurant(userId, restaurantId, path);
      onSuccess?.();
    } catch (error) {
      onFailure?.();
    }
  }

  return { handleFavoriteToggle };
}
