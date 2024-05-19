"use client";

import { formatCurrency } from "@/app/utils/price";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "@/app/actions/restaurant";
import { toast } from "sonner";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export default function RestaurantItem({
  userId,
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) {
  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  function favoriteToggle() {
    if (isFavorite) {
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
      await favoriteRestaurant(userId, restaurant.id);
      toast.success("Restaurant has been added to favorites");
    } catch (error) {
      toast.error("Unable to add restaurant to favorites, please try again.");
    }
  }

  async function handleUnfavorite() {
    if (!userId) {
      return;
    }

    try {
      await unfavoriteRestaurant(userId, restaurant.id);
      toast.success("Restaurant has been removed from favorites");
    } catch (error) {
      toast.error(
        "Unable to remove restaurant from favorites, please try again.",
      );
    }
  }

  return (
    <div className={`min-w-[266px] max-w-[266px] ${className}`}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurant/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />
          </Link>
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-white px-2 py-0.5 text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
            <span className="text-xs font-semibold text-black">5.0</span>
          </div>

          {userId && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 size-7 rounded-full bg-white/30 backdrop-blur-sm ${isFavorite && "bg-primary hover:bg-white/30"}`}
              onClick={favoriteToggle}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />

              <span className="text-xs text-muted-foreground">
                {+restaurant.deliveryFee === 0
                  ? "Free Delivery"
                  : formatCurrency(+restaurant.deliveryFee)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />

              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
