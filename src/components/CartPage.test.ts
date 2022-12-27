import { describe, test, expect } from "@jest/globals";
import { CART_ITEM } from "../reducer.mock";
import { getTotalPrice } from "./CartPage.utils";

describe("CartPage.utils.ts", () => {
  test("getTotalPrice()", () => {
    const cartItems = [CART_ITEM, CART_ITEM];
    const currency = "GBP";
    expect(getTotalPrice(cartItems, currency)).toEqual(208);
  });
});
