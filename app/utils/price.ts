import { Product } from "@prisma/client";

/**
Calculates the total price of a product, taking into account any discounts.
@param product - the product for which to calculate the total price
@returns the total price of the product, after any discounts have been applied
 */
export function calculateProductTotalPrice(product: Product): number {
  const { price, discountPercentage } = product;

  const priceAsNumber = parseFloat(price.toString());

  if (discountPercentage === 0) {
    return priceAsNumber;
  }

  const discount = priceAsNumber * (discountPercentage / 100);

  return priceAsNumber - discount;
}

/**
 * Formats the given value as a currency string in USD format.
 * @param value - The numeric value to be formatted.
 * @returns A string representation of the value in USD format, with a minimum of 2 decimal places.
 */
export function formatCurrency(value: number): string {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
