"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function favoriteRestaurant(userId: string, restaurantId: string) {
  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
}

export async function unfavoriteRestaurant(
  userId: string,
  restaurantId: string,
) {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });

  revalidatePath("/");
}
