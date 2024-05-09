"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./actions/search";
import Header from "@/components/header";
import Heading from "@/components/heading";
import RestaurantItem from "@/components/restaurant-item";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");

  useEffect(() => {
    async function fetchRestaurants() {
      if (!searchFor) {
        return;
      }

      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    }

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="p-5">
        <Heading title="Found Restaurants" className="mb-5" />
        <div className="flex w-full flex-col space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
