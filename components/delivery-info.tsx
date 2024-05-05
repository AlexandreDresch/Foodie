import { formatCurrency } from "@/app/utils/price";
import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

export default function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
  return (
    <Card className="flex justify-around py-2">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BikeIcon size={14} />
          <span className="text-xs">Delivery Fee</span>
        </div>

        <p className="text-xs font-semibold">
          {+restaurant.deliveryFee === 0
            ? "Free"
            : formatCurrency(+restaurant.deliveryFee)}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TimerIcon size={14} />
          <span className="text-xs">Delivery Time</span>
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
}
