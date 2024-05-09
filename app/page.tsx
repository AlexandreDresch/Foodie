import Banner from "@/components/banner";
import CategoryList from "@/components/category-list";
import Header from "@/components/header";
import Heading from "@/components/heading";
import ProductList from "@/components/product-list";
import RestaurantList from "@/components/restaurant-list";
import Search from "@/components/search";

import { db } from "@/lib/prisma";

export default async function Home() {
  const discountProducts = await db.product.findMany({
    where: { discountPercentage: { gt: 0 } },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Banner
          color="bg-[#EA1D2C]"
          percentage={30}
          text="of pizzas"
          image="/pizza.png"
        />
      </div>

      <div className="space-y-3 pt-6">
        <Heading
          title="Our Recommendation"
          link={`/product/recommended`}
          className="px-5"
        />
        <ProductList products={discountProducts} />
      </div>

      <div className="px-5 pt-6">
        <Banner
          color="bg-[#FFB100]"
          percentage={20}
          text="of hamburgers"
          image="/burger.png"
        />
      </div>

      <div className="space-y-3 py-6">
        <Heading
          title="Best Restaurants"
          link="/restaurant/recommended"
          className="px-5"
        />
        <RestaurantList />
      </div>
    </>
  );
}
