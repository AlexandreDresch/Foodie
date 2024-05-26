"use client";

import { CartContext } from "@/app/context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/app/utils/price";
import Badge from "@/components/badge";
import Cart from "@/components/cart";
import DeliveryInfo from "@/components/delivery-info";
import Heading from "@/components/heading";
import ProductList from "@/components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Prisma } from "@prisma/client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export default function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity((currentState) => currentState - 1);
    }
  }

  function handleIncreaseQuantity() {
    setQuantity((currentState) => currentState + 1);
  }

  function handleAddProductToCart() {
    const hasDifferentRestaurant = products.some(
      (prevProduct) => prevProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurant) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({ emptyCart: false });
  }

  function addToCart({ emptyCart }: { emptyCart: boolean }) {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  }

  return (
    <>
      <div className="relative z-50 -mt-[1.5rem] rounded-t-xl bg-white py-5 md:-mt-0 md:w-1/2 md:p-0">
        <div className="flex items-center gap-2 px-5">
          <div className="relative size-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <Link
            className="text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
            href={`/restaurant/${product.restaurantId}`}
          >
            {product.restaurant.name}
          </Link>
        </div>

        <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between px-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>

              {product.discountPercentage > 0 && (
                <Badge percentage={product.discountPercentage} />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(+product.price)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>

            <span className="w-4">{quantity}</span>

            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground transition-colors hover:border-white hover:bg-primary hover:text-white"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="mt-6 px-5 py-2">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 h-[43%] space-y-3 px-5">
          <Heading title="Description" />
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3 px-5 md:hidden">
          <Heading title={`More from ${product.restaurant.name}`} />
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5">
          <Button
            className="flex w-full gap-2"
            onClick={handleAddProductToCart}
          >
            <ShoppingCartIcon size={18} />
            <span className="font-semibold">Add to Cart</span>
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[85vw]">
          <SheetHeader className="text-left">
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <Cart setIsCartOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              cart from another restaurant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
