import { describe, test, expect } from "@jest/globals";
import { CART_ITEM } from "../reducer.mock";
import {
  getQuantity,
  getQuantityCartIcon,
  getTotalPrice,
} from "./CartPage.utils";

describe("CartPage.utils.ts", () => {
  test("getTotalPrice()", () => {
    const cartItems = [CART_ITEM, CART_ITEM];
    const currency = "GBP";
    expect(getTotalPrice(cartItems, currency)).toEqual(208);
  });

  test("getQuantity()", () => {
    const cartItems = [CART_ITEM];
    expect(getQuantity(cartItems)).toEqual(1);
  });

  test.only("getQuantityCartIcon()", () => {
    const cartItems = [CART_ITEM, CART_ITEM];
    expect(getQuantityCartIcon(cartItems)).toEqual(2);
  });
});
