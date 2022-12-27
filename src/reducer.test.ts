import { describe, test, expect } from "@jest/globals";
import rootReducer, {
  CartIncrementItemPayload,
  CartDecrementItemPayload,
  CurrencyPayload,
  CategoryNamePayload,
} from "./reducer";
import { ACTION_ADD, ACTION_REMOVE, INITIAL_STATE } from "./reducer.mock";
import { updateAttributes } from "./reducer";
import { PRODUCT } from "./reducer.mock";
import { Currency, Product } from "./graphql/types";

type CartItem = {
  id: string;
  color?: string;
  quantity: number;
};

const addToCart = (
  cartItems: CartItem[],
  cartItem: Product,
  cartItemColor: string
): CartItem[] => {
  return [...cartItems, { ...cartItem, color: cartItemColor, quantity: 1 }];
};

describe("rootReducer()", () => {
  test("add", () => {
    const cartItems: CartItem[] = [];
    const color = "red";
    const newItem = PRODUCT;
    const newCartItems = addToCart(cartItems, newItem, color);
    expect(newCartItems).toEqual([{ ...newItem, color, quantity: 1 }]);
  });

  test("sum", () => {
    const a = 3;
    const b = 2;
    const sum = (a: number, b: number) => {
      return a + b;
    };

    expect(sum(a, b)).toEqual(5);
  });

  test("action_type: SET_CATEGORY_NAME", () => {
    const newName = "CLOTHES";
    const result = rootReducer(
      {
        ...INITIAL_STATE,
        categoryName: "ALL",
      },
      {
        type: "SET_CATEGORY_NAME",
        payload: { categoryName: newName } as CategoryNamePayload,
      }
    );
    expect(result.categoryName).toEqual(newName);
  });

  test("action_type: SET_CURRENCY", () => {
    const newCurrency: Currency = "GBP";
    const result = rootReducer(
      {
        ...INITIAL_STATE,
        currency: "USD",
      },
      {
        type: "SET_CURRENCY",
        payload: { currency: newCurrency } as CurrencyPayload,
      }
    );
    expect(result.currency).toEqual(newCurrency);
  });

  test("action_type: CART_INCREMENT_ITEM and CART_DECREMENT_ITEM", () => {
    const result = rootReducer(
      {
        ...INITIAL_STATE,
        cartItems: [
          { ...PRODUCT, id: "2", quantity: 10 },
          { ...PRODUCT, quantity: 1 },
        ],
      },
      {
        type: "CART_INCREMENT_ITEM",
        payload: { product: PRODUCT } as CartIncrementItemPayload,
      }
    );
    expect(result.cartItems[0].quantity).toEqual(10);
    expect(result.cartItems[1].quantity).toEqual(2);

    const newResult = rootReducer(result, {
      type: "CART_DECREMENT_ITEM",
      payload: { product: PRODUCT } as CartDecrementItemPayload,
    });
    expect(newResult.cartItems[1].quantity).toEqual(1);
  });

  test("action_type: CART_ADD_ITEM and CART_REMOVE_ITEM", () => {
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
          attributes: updateAttributes(attributes, selectedAttributeValues),
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

  test.skip("testttt", () => {
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

  test("getProductsAttribute", () => {
    const result = updateAttributes(PRODUCT.attributes, {
      Size: "40",
      Color: "white",
      // Capacity: "100", // has isSelected=true and should't be updated to false
    });
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
      {
        __typename: "AttributeSet",
        id: "Capacity",
        name: "Capacity",
        type: "text",
        items: [
          {
            __typename: "Attribute",
            id: "100",
            displayValue: "100",
            isSelected: true,
          },
          {
            __typename: "Attribute",
            id: "200",
            displayValue: "200",
            isSelected: false,
          },
          {
            __typename: "Attribute",
            id: "300",
            displayValue: "300",
            isSelected: false,
          },
          {
            __typename: "Attribute",
            id: "400",
            displayValue: "400",
            isSelected: false,
          },
        ],
      },
      {
        __typename: "AttributeSet",
        id: "Color",
        name: "Color",
        type: "text",
        items: [
          {
            __typename: "Attribute",
            id: "white",
            displayValue: "white",
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
