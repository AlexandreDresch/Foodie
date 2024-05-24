"use client";

import useToggleFavoriteRestaurant from "@/app/hooks/use-toggle-favorite-restaurant";
import { isRestaurantFavorite } from "@/app/utils/restaurant";
import { Button } from "@/components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  const restaurantIsCurrentlyFavorite = isRestaurantFavorite(
    restaurant.id,
    userFavoriteRestaurants,
  );

  function handleGoBack() {
    router.back();
  }

  const { handleFavoriteToggle } = useToggleFavoriteRestaurant({
    userId: data?.user.id,
    restaurantId: restaurant.id,
    restaurantIsCurrentlyFavorite,
    path: pathname,
    onSuccess: () =>
      toast.success(
        restaurantIsCurrentlyFavorite
          ? "Restaurant has been removed from favorites"
          : "Restaurant has been added to favorites",
      ),
    onFailure: () =>
      toast.error(
        restaurantIsCurrentlyFavorite
          ? "Unable to remove restaurant from favorites, please try again."
          : "Unable to add restaurant to favorites, please try again.",
      ),
  });

  function handleFavorite() {
    handleFavoriteToggle();
  }

  return (
    <div className="relative h-[215px] w-full md:h-[500px] md:w-1/2">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover md:rounded-lg"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground transition-colors hover:text-white md:hidden"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeftIcon />
      </Button>

      {data?.user.id && (
        <Button
          size="icon"
          className={`absolute right-4 top-4 rounded-full bg-white/30 backdrop-blur-sm ${restaurantIsCurrentlyFavorite && "bg-primary hover:bg-white/30"}`}
          onClick={handleFavorite}
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
      )}
    </div>
  );
}
