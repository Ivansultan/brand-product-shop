import { Product } from "./pages/ProductPage";

type CartProduct = Product & {
  quantity: number;
  // isSelected?: boolean; // TODO: Delete?
};

type Currency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type ProductSize = "Small" | "Medium" | "Large" | "Extra Large";

export type AppState = {
  cartItems: CartProduct[];
  currency: Currency;
  categoryName: string;
};

const initialState: AppState = {
  cartItems: [],
  currency: "USD",
  categoryName: "ALL",
};

type ActionType =
  | "CART_ADD_ITEM"
  | "CART_REMOVE_ITEM"
  | "SET_CURRENCY"
  | "CART_INCREMENT_ITEM"
  | "CART_DECREMENT_ITEM"
  | "SET_CATEGORY_NAME"
  | "UPDATE_ATTRIBUTES";

type CartItemsPayload = {
  product: Product;
};

type CurrencyPayload = {
  currency: Currency;
};

type CategoryNamePayload = {
  categoryName: string;
};

export type UpdateAttributesPayload = {
  // productId: Product.productId;
  params: {
    productId: string;
    attributeId: string;
    attributeValueId: string;
  };
};

type Action = {
  type: ActionType; //Обязательный параметр (ActionType с которым мы что-то делаем)
  payload:
    | CartItemsPayload
    | CurrencyPayload
    | CategoryNamePayload
    | UpdateAttributesPayload; // Необязательный параметр (тип ActionType, доп. инфа)
};

const rootReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "UPDATE_ATTRIBUTES":
      const { productId, attributeId, attributeValueId } = (
        action.payload as UpdateAttributesPayload
      ).params;

      console.log("productId", productId);
      console.log("attributeId", attributeId);
      console.log("attributeValueId", attributeValueId);

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          return cartItem.id === productId
            ? {
                ...cartItem,
                attributes: cartItem.attributes.map((attribute) => {
                  return attribute.id === attributeId
                    ? {
                        ...attribute,
                        items: attribute.items.map((attrValue) => {
                          return attrValue.id === attributeValueId
                            ? {
                                ...attrValue,
                                isSelected: true,
                              }
                            : {
                                ...attrValue,
                                isSelected: false,
                              };
                        }),
                      }
                    : attribute;
                }),
              }
            : cartItem;
        }),
      };

    // Шагі
    // 1. По productId найті carteItem.id
    // 2. По attributeName  найті carteItem.attributes.id
    // 3. По attributeValue  найті carteItem.attributes.items.id
    // 4. Добавіть carteItem.attributes.items.isSelected = True

    // const { productId, attributeName, attributeValue } = action.params;
    //   const cartItems = state.cartItems.map((cartItem) => {
    //     return cartItem.productId === productId
    //       ? {
    //           ...cartItem,
    //           attributes: cartItem.attributes.map((attribute) => {
    //             return attribute.attributeName === attributeName
    //               ? {}
    //               : attribute;
    //           }),
    //         }
    //       : cartItem;
    //   });
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems],
    //   };

    // cartItems.product.attributes // спісок
    //   [
    //     {
    //         "__typename": "AttributeSet",
    //         "id": "Capacity",
    //         "name": "Capacity",
    //         "type": "text",
    //         "items": [
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "256GB",
    //                 "displayValue": "256GB",
    //                 "isSelected": true || false //////////////////////////
    //             },
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "512GB",
    //                 "displayValue": "512GB"
    //             }
    //         ]
    //     },
    //     {
    //         "__typename": "AttributeSet",
    //         "id": "With USB 3 ports",
    //         "name": "With USB 3 ports",
    //         "type": "text",
    //         "items": [
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "Yes",
    //                 "displayValue": "Yes"
    //             },
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "No",
    //                 "displayValue": "No"
    //             }
    //         ]
    //     },
    //     {
    //         "__typename": "AttributeSet",
    //         "id": "Touch ID in keyboard",
    //         "name": "Touch ID in keyboard",
    //         "type": "text",
    //         "items": [
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "Yes",
    //                 "displayValue": "Yes"
    //             },
    //             {
    //                 "__typename": "Attribute",
    //                 "id": "No",
    //                 "displayValue": "No"
    //             }
    //         ]
    //     }
    // ]

    case "CART_ADD_ITEM":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...(action.payload as CartItemsPayload).product, quantity: 1 },
        ],
      };
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== (action.payload as CartItemsPayload).product.id
        ),
      };
    case "CART_INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === (action.payload as CartItemsPayload).product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    case "CART_DECREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === (action.payload as CartItemsPayload).product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    // case "SET_ATTRIBUTE":
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((cartItem) => {
    //       return cartItem.attributes.map((attribute) => {
    //         return attribute.items.map((item) => {
    //           return item;
    //         });
    //       });
    //     }),
    //   };
    case "SET_CATEGORY_NAME":
      return {
        ...state,
        categoryName: (action.payload as CategoryNamePayload).categoryName,
      };

    case "SET_CURRENCY":
      const newState = {
        ...state,
        currency: (action.payload as CurrencyPayload).currency,
      };

      return newState;
    default:
      return state;
  }
};

export default rootReducer;
