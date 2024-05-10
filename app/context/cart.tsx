"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart(product: Product, quantity: number): void;
  decreaseProductQuantity(productId: string): void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  function decreaseProductQuantity(productId: string) {
    return setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : p.quantity }
          : p,
      ),
    );
  }

  function addProductToCart(product: Product, quantity: number) {
    const existingProduct = products.find((p) => p.id === product.id);
    if (existingProduct) {
      return setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p,
        ),
      );
    }
    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  }

  return (
    <CartContext.Provider
      value={{ products, addProductToCart, decreaseProductQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
