import { ICartItem } from "@/redux/slices/productSlice";
import formatPrice from "./formatPrice";

export const calculateCartTotals = (cart: ICartItem[]) => {
  let subtotal = 0;
  let totalShipping = 0;
  let currency = ""; // Initialize currency

  // Calculate subtotal, total shipping, and determine the currency
  cart.forEach((item) => {
    subtotal += item.product.price * item.quantity;
    totalShipping += item.product.shippingPrice * item.quantity;

    // Set the currency based on the first item in the cart
    if (!currency) {
      currency = item.product.currency;
    }
  });

  // Calculate total cost
  const total = subtotal + totalShipping;

  // Format the totals according to the determined currency
  const formattedSubtotal = formatPrice(subtotal, currency);
  const formattedTotalShipping = formatPrice(totalShipping, currency);
  const formattedTotal = formatPrice(total, currency);

  return {
    subtotal: formattedSubtotal,
    totalShipping: formattedTotalShipping,
    total: formattedTotal,
  };
};
