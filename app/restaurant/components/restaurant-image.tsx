"use client";

import useToggleFavoriteRestaurant from "@/app/hooks/use-toggle-favorite-restaurant";
import { Button } from "@/components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export default function RestaurantImage({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) {
  const router = useRouter();
  const { data } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const restaurantIsCurrentlyFavorite = userFavoriteRestaurants.some(
      (fav) => fav.restaurantId === restaurant.id,
    );
    setIsFavorite(restaurantIsCurrentlyFavorite);
  }, [userFavoriteRestaurants, restaurant.id]);

  function handleGoBack() {
    router.back();
  }

  const { handleFavoriteToggle } = useToggleFavoriteRestaurant({
    userId: data?.user.id,
    restaurantId: restaurant.id,
    restaurantIsCurrentlyFavorite: isFavorite,
    path: pathname,
    onSuccess: () =>
      toast.success(
        isFavorite
          ? "Restaurant has been removed from favorites"
          : "Restaurant has been added to favorites",
      ),
    onFailure: () =>
      toast.error(
        isFavorite
          ? "Unable to remove restaurant from favorites, please try again."
          : "Unable to add restaurant to favorites, please try again.",
      ),
  });

  function handleFavorite() {
    handleFavoriteToggle();
  }

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground transition-colors hover:text-white"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeftIcon />
      </Button>

      {data?.user.id && (
        <Button
          size="icon"
          className={`absolute right-4 top-4 rounded-full bg-white/30 backdrop-blur-sm ${isFavorite && "bg-primary hover:bg-white/30"}`}
          onClick={handleFavorite}
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
      )}
    </div>
  );
}
