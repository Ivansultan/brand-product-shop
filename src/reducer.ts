import { Product } from "./pages/ProductPage";

type CartProduct = Product & {
  quantity: number;
};

type Currency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type place = "PAGE" | "POPUP";

export type AppState = {
  cartItems: CartProduct[];
  currency: Currency;
};

const initialState: AppState = {
  cartItems: [],
  currency: "USD",
};

type ActionType =
  | "CART_ADD_ITEM"
  | "CART_REMOVE_ITEM"
  | "SET_CURRENCY"
  | "CART_INCREMENT_ITEM"
  | "CART_DECREMENT_ITEM";

type CartItemsPayload = {
  product: Product;
};

type CurrencyPayload = {
  currency: Currency;
};

type Action = {
  type: ActionType; //Обязательный параметр (ActionType с которым мы что-то делаем)
  payload: CartItemsPayload | CurrencyPayload; // Необязательный параметр (тип ActionType, доп. инфа)
};

const rootReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
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
