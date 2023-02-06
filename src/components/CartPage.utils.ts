import { AppState } from "../reducer";

type Price = {
  currency: AppState["currency"];
  amount: number;
};

export const getPrice = (
  prices: Price[],
  currency: AppState["currency"]
): Price => {
  return prices.filter((item) => item.currency === currency)[0];
};

export const getTotalPrice = (
  cartItems: AppState["cartItems"],
  currency: AppState["currency"]
) => {
  const total = cartItems.reduce((sum, item) => {
    const price = getPrice(item.prices, currency); // price on 1 item
    return sum + price.amount * item.quantity;
  }, 0);

  return total;
};

export const getQuantity = (cartItems: AppState["cartItems"]) => {
  const quantity = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  return quantity;
};

export const getQuantityCartIcon = (cartItems: AppState["cartItems"]) => {
  const quantityCartIcon = cartItems.reduce((sum, item) => {
    const quantity = 1;
    return sum + quantity;
  }, 0);
  return quantityCartIcon;
};
