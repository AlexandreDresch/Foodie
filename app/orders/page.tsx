import Header from "@/components/header";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="font-semibold">Orders</h2>

        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <p>{order.id}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
