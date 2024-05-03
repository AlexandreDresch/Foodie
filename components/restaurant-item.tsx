import { formatCurrency } from "@/app/utils/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          fill
          className="rounded-lg object-cover"
          alt={restaurant.name}
        />

        <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-white px-2 py-0.5 text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="text-xs font-semibold text-black">5.0</span>
        </div>

        <Button
          size="icon"
          className="absolute right-2 top-2 size-7 rounded-full bg-white/30 backdrop-blur-sm"
        >
          <HeartIcon size={16} className="fill-white" />
        </Button>
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
  );
}
