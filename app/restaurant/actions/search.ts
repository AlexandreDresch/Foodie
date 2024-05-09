"use server";

import { db } from "@/lib/prisma";

export async function searchForRestaurants(search: string) {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
}
