"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../actions/search";
import Header from "@/components/header";
import Heading from "@/components/heading";
import RestaurantItem from "@/components/restaurant-item";

interface RestaurantsProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export default function Restaurants({
  userFavoriteRestaurants,
}: RestaurantsProps) {
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
      <div className="p-5 lg:px-28">
        <Heading title="Found Restaurants" className="mb-5" />
        <div className="mt-5 flex w-full flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userFavoriteRestaurants={userFavoriteRestaurants}
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
