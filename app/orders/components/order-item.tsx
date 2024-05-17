"use client";

import { CartContext } from "@/app/context/cart";
import { formatCurrency } from "@/app/utils/price";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

function getOrderStatusLabelColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.CONFIRMED:
      return "bg-green-400";
    case OrderStatus.PREPARING:
      return "bg-yellow-400";
    case OrderStatus.FINISHED:
      return "bg-sky-400";
    case OrderStatus.DELIVERING:
      return "bg-muted";
    case OrderStatus.CANCELLED:
      return "bg-red-500";
    default:
      return "bg-muted";
  }
}

export default function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  function handleRedoOrder() {
    for (const product of order.products) {
      addProductToCart({
        product: { ...product.product, restaurant: order.restaurant },
        quantity: product.quantity,
      });
    }

    router.push(`/restaurant/${order.restaurantId}`);
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 text-white ${getOrderStatusLabelColor(order.status)}`}
        >
          <span className="block text-xs font-semibold capitalize">
            {order.status.toLocaleLowerCase()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" asChild className="size-5">
            <Link href={`/restaurant/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>

              <span className="block text-sm text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(+order.totalPrice)}</p>

          <Button
            variant="ghost"
            className="text-xs text-primary"
            size="sm"
            disabled={order.status !== "FINISHED"}
            onClick={handleRedoOrder}
          >
            Order again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
