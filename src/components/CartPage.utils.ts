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
