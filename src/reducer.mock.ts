import { AppState, initialState } from "./reducer";

export const INITIAL_STATE: AppState = {
  ...initialState,
};

export const PRODUCT = {
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
      currency: "USD" as const,
      amount: 144.69,
    },
    {
      __typename: "Price",
      currency: "GBP" as const,
      amount: 104,
    },
    {
      __typename: "Price",
      currency: "AUD" as const,
      amount: 186.65,
    },
    {
      __typename: "Price",
      currency: "JPY" as const,
      amount: 15625.24,
    },
    {
      __typename: "Price",
      currency: "RUB" as const,
      amount: 10941.76,
    },
  ],
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
