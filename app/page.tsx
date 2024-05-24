import Banner from "@/components/banner";
import CategoryList from "@/components/category-list";
import Header from "@/components/header";
import Heading from "@/components/heading";
import ProductList from "@/components/product-list";
import RestaurantList from "@/components/restaurant-list";
import Search from "@/components/search";
import SearchBanner from "@/components/search-banner";

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
      <div className="px-5 pt-6 md:hidden">
        <Search />
      </div>

      <div className="hidden pt-6 md:block">
        <SearchBanner />
      </div>

      <div className="px-5 pt-6 lg:px-28">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 md:hidden">
        <Banner
          className="bg-[#EA1D2C]"
          percentage={30}
          text="of pizzas"
          image="/pizza.png"
        />
      </div>

      <div className="space-y-3 px-5 pt-6 lg:px-28">
        <Heading title="Our Recommendation" link={`/product/recommended`} />
        <ProductList products={discountProducts} />
      </div>

      <div className="px-5 pt-6 md:flex md:gap-5 lg:px-28">
        <Banner
          className="hidden bg-[#EA1D2C] md:flex"
          percentage={30}
          text="of pizzas"
          image="/pizza.png"
        />

        <Banner
          className="bg-[#FFB100]"
          percentage={20}
          text="of hamburgers"
          image="/burger.png"
        />
      </div>

      <div className="mb-10 space-y-3 px-5 pt-6 lg:px-28">
        <Heading title="Best Restaurants" link="/restaurant/recommended" />
        <RestaurantList />
      </div>
    </>
  );
}
