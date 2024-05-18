import { Suspense } from "react";
import Restaurants from "./components/restaurants";

export default function RestaurantsPage() {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
}
