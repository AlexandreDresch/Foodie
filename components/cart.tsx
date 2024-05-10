import { CartContext } from "@/app/context/cart";
import { useContext } from "react";
import CartItem from "./cart-item";

export default function Cart() {
  const { products } = useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
