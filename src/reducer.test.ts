import { describe, test, expect } from "@jest/globals";
import rootReducer from "./reducer";
import { ACTION_ADD, ACTION_REMOVE, INITIAL_STATE } from "./reducer.mock";
import { getProductsAttribute } from "./reducer";
import { PRODUCT } from "./reducer.mock";

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

  test("action_type", () => {
    // Add to cart
    const { product, selectedAttributeValues } =
      ACTION_ADD.CART_ADD_ITEM.payload;
    const { attributes, ...restProduct } = product;
    const stateWithProduct = rootReducer(
      INITIAL_STATE,
      ACTION_ADD.CART_ADD_ITEM
    );
    expect(stateWithProduct).toEqual({
      ...INITIAL_STATE,
      cartItems: [
        ...INITIAL_STATE.cartItems,
        {
          ...restProduct,
          attributes: getProductsAttribute(attributes, selectedAttributeValues),
          quantity: 1,
        },
      ],
    });

    // Remove from cart
    const stateWithoutProducts = rootReducer(
      stateWithProduct,
      ACTION_REMOVE.CART_REMOVE_ITEM
    );
    expect(stateWithoutProducts).toEqual({
      ...stateWithProduct,
      cartItems: [],
    });
  });

  test("testttt", () => {
    const multiply = (ls: number[]) => {
      return ls;
    };
    const ls = [1, 2, 3];
    expect(multiply(ls)).toEqual([2, 4, 6]);

    // const setIsSelected = (items: any[], selectedItemId: any) => {
    //   return [];
    // };
    // expect(
    //   setIsSelected(
    //     [
    //       {
    //         __typename: "Attribute",
    //         id: "40",
    //         displayValue: "40",
    //         isSelected: false,
    //       },
    //       {
    //         __typename: "Attribute",
    //         id: "41",
    //         displayValue: "41",
    //         isSelected: false,
    //       },
    //       {
    //         __typename: "Attribute",
    //         id: "42",
    //         displayValue: "42",
    //         isSelected: false,
    //       },
    //       {
    //         __typename: "Attribute",
    //         id: "43",
    //         displayValue: "43",
    //         isSelected: false,
    //       },
    //     ],
    //     "42"
    //   )
    // ).toEqual([
    //   {
    //     __typename: "Attribute",
    //     id: "40",
    //     displayValue: "40",
    //     isSelected: false,
    //   },
    //   {
    //     __typename: "Attribute",
    //     id: "41",
    //     displayValue: "41",
    //     isSelected: false,
    //   },
    //   {
    //     __typename: "Attribute",
    //     id: "42",
    //     displayValue: "42",
    //     isSelected: true,
    //   },
    //   {
    //     __typename: "Attribute",
    //     id: "43",
    //     displayValue: "43",
    //     isSelected: false,
    //   },
    // ]);
  });

  test.only("getProductsAttribute", () => {
    const result = getProductsAttribute(PRODUCT.attributes, { Size: "40" });
    console.log(JSON.stringify(result, null, 2));
    expect(result).toEqual([
      {
        __typename: "AttributeSet",
        id: "Size",
        name: "Size",
        type: "text",
        items: [
          {
            __typename: "Attribute",
            id: "40",
            displayValue: "40",
            isSelected: true,
          },
          {
            __typename: "Attribute",
            id: "41",
            displayValue: "41",
            isSelected: false,
          },
          {
            __typename: "Attribute",
            id: "42",
            displayValue: "42",
            isSelected: false,
          },
          {
            __typename: "Attribute",
            id: "43",
            displayValue: "43",
            isSelected: false,
          },
        ],
      },
    ]);
  });
});
