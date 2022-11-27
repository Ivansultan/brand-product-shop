import { describe, test, expect } from "@jest/globals";
import rootReducer, { CartProduct, AppState } from "./reducer";
import { ACTIONS, STATE } from "./reducer.mock";

type Item = {
  id: string;
  color?: string;
};

const addToCart = (
  cartItems: Item[],
  cartItem: Item,
  cartItemColor: string
): Item[] => {
  return [...cartItems, { ...cartItem, color: cartItemColor }];
};

describe("rootReducer()", () => {
  test("add", () => {
    const cartItems: Item[] = [];
    const color = "red";
    const newItem = { id: "product1" };
    const newCartItems = addToCart(cartItems, newItem, color);
    console.log(newCartItems);
    expect(newCartItems).toEqual([{ ...newItem, color }]);
  });

  test("sum", () => {
    const a = 3;
    const b = 2;
    const sum = (a: number, b: number) => {
      return a + b;
    };

    expect(sum(a, b)).toEqual(5);
  });

  test.only("action_type: CART_ADD_ITEM", () => {
    const newState = {
      ...STATE,
      cartItems: [
        ...STATE.cartItems,
        {
          ...ACTIONS.CART_ADD_ITEM.payload.product,
          quantity: 1,
        },
      ],
    };
    const result = rootReducer(STATE, ACTIONS.CART_ADD_ITEM);
    expect(result).toEqual(newState);
  });
});
