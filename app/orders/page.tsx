import Header from "@/components/header";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 lg:px-28">
        <h2 className="pb-6 font-semibold">Orders</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </>
  );
}
