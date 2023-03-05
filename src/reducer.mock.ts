import { AppState, initialState, CartProduct } from "./reducer";
import { Product } from "./graphql/types";

export const INITIAL_STATE: AppState = {
  ...initialState,
};

export const PRODUCT: Product = {
  __typename: "Product",
  id: "huarache-x-stussy-le",
  name: "Nike Air Huarache Le",
  inStock: true,
  gallery: [
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
  ],
  description: "<p>Great sneakers for everyday use!</p>",
  category: "clothes",
  brand: "Nike x Stussy",
  attributes: [
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
          isSelected: false,
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
          isSelected: false,
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
  ],
  prices: [
    {
      __typename: "Price",
      currency: {
        label: "USD",
        symbol: "$",
      },
      amount: 144.69,
    },
    {
      __typename: "Price",
      currency: {
        label: "GBP",
        symbol: "£",
      },
      amount: 104,
    },
    {
      __typename: "Price",
      currency: {
        label: "AUD",
        symbol: "A$",
      },
      amount: 186.65,
    },
    {
      __typename: "Price",
      currency: {
        label: "JPY",
        symbol: "¥",
      },
      amount: 15625.24,
    },
    {
      __typename: "Price",
      currency: {
        label: "RUB",
        symbol: "₽",
      },
      amount: 10941.76,
    },
  ],
};

export const CART_ITEM: CartProduct = {
  ...PRODUCT,
  quantity: 1,
};

export const ACTION_ADD = {
  CART_ADD_ITEM: {
    type: "CART_ADD_ITEM" as const,
    payload: {
      product: PRODUCT,
      selectedAttributeValues: {
        Size: "41",
      },
    },
  },
};

export const ACTION_REMOVE = {
  CART_REMOVE_ITEM: {
    type: "CART_REMOVE_ITEM" as const,
    payload: {
      product: PRODUCT,
    },
  },
};
