"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../utils/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: { select: { deliveryFee: true } } };
  }> {
  quantity: number;
}

interface ProductWithRestaurant
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {}

interface addProductToCartProps {
  product: ProductWithRestaurant;
  quantity: number;
  emptyCart?: boolean;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalQuantity: number;
  discountTotal: number;
  addProductToCart({
    product,
    quantity,
    emptyCart,
  }: addProductToCartProps): void;
  decreaseProductQuantity(productId: string): void;
  increaseProductQuantity(productId: string): void;
  removeProductFromCart(productId: string): void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalQuantity: 0,
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
    return (
      products.reduce((total, product) => {
        return total + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    );
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((total, product) => total + product.quantity, 0);
  }, [products]);

  const discountTotal =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

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

  function addProductToCart({
    product,
    quantity,
    emptyCart,
  }: addProductToCartProps) {
    if (emptyCart) {
      setProducts([]);
    }

    const existingProduct = products.find((p) => p.id === product.id);

    if (existingProduct) {
      return setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p,
        ),
      );
    } else {
      setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
    }
  }

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalQuantity,
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
