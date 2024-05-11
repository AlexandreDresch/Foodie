"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../utils/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: { select: { deliveryFee: true } } };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  discountTotal: number;
  addProductToCart(product: Product, quantity: number): void;
  decreaseProductQuantity(productId: string): void;
  increaseProductQuantity(productId: string): void;
  removeProductFromCart(productId: string): void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  discountTotal: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce(
      (total, product) => total + Number(product.price) * product.quantity,
      0,
    );
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return total + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const discountTotal = subtotalPrice - totalPrice;

  function decreaseProductQuantity(productId: string) {
    return setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : p.quantity }
          : p,
      ),
    );
  }

  function increaseProductQuantity(productId: string) {
    return setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  }

  function removeProductFromCart(productId: string) {
    return setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  function addProductToCart(product: Product, quantity: number) {
    const existingProduct = products.find((p) => p.id === product.id);
    if (existingProduct) {
      return setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, quantity: quantity } as CartProduct,
      ]);
    }
  }

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        discountTotal,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
