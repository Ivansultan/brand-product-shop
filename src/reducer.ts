import { Currency, Product } from "./graphql/types";
import { SelectedAttributeValues } from "./pages/ProductPage";

export type CartProduct = Product & {
  quantity: number;
};

export type AppState = {
  cartItems: CartProduct[];
  currency: Currency;
  categoryName: string;
};

export const initialState: AppState = {
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

type CartAddItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

type CartRemoveItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CartIncrementItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CartDecrementItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CurrencyPayload = {
  currency: Currency;
};

export type CategoryNamePayload = {
  categoryName: string;
};

export type UpdateAttributesPayload = {
  params: {
    productId: string;
    attributeId: string;
    attributeValueId: string;
  };
};

type Action = {
  type: ActionType; // required parameter (ActionType with which we do something)
  payload:
    | CartAddItemPayload
    | CartRemoveItemPayload
    | CartIncrementItemPayload
    | CartDecrementItemPayload
    | CurrencyPayload
    | CategoryNamePayload
    | UpdateAttributesPayload; // optional parameter (payload, additional info)
};

export const updateAttributes = (
  attributes: Product["attributes"],
  selectedAttributeValues: { [key: string]: string }
) => {
  const updatedAttributes = attributes.map((attribute) => {
    // with map attribute we have the opportunity show the attribute list or modify what we need
    return !!selectedAttributeValues[attribute.id] // !! - transformation in boolean type / check attribute is selected or not
      ? {
          ...attribute,
          items: attribute.items.map((attrValue) => {
            return {
              ...attrValue,
              isSelected:
                selectedAttributeValues[attribute.id] === attrValue.id,
            };
          }),
        }
      : attribute;
  });
  return updatedAttributes;
};

const rootReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "UPDATE_ATTRIBUTES":
      const { productId, attributeId, attributeValueId } = (
        action.payload as UpdateAttributesPayload
      ).params;

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          return cartItem.id === productId
            ? {
                ...cartItem,
                attributes: updateAttributes(cartItem.attributes, {
                  [attributeId]: attributeValueId,
                }),
              }
            : cartItem;
        }),
      };

    case "CART_ADD_ITEM":
      const { product, selectedAttributeValues } =
        action.payload as CartAddItemPayload;
      const { attributes, ...rest } = product;
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...rest,
            attributes: updateAttributes(attributes, selectedAttributeValues!),
            quantity: 1,
          },
        ],
      };
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item.id !== (action.payload as CartRemoveItemPayload).product.id
        ),
      };
    case "CART_INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === (action.payload as CartIncrementItemPayload).product.id
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
          item.id === (action.payload as CartDecrementItemPayload).product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

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
