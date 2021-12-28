import { Product } from "./pages/ProductPage";

type CartItem = {
  id: string;
  quantity: number;
};

type Currency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type AppState = {
  cartItems: CartItem[];
  currency: Currency;
};

const initialState: AppState = {
  cartItems: [],
  currency: "USD",
};

type ActionType = "CART_ADD_ITEM" | "CART_REMOVE_ITEM" | "SET_CURRENCY";

type CartItemsPayload = {
  productId: Product["id"];
};

type CurrencyPayload = {
  currency: Currency;
};

type Action = {
  type: ActionType;
  payload: CartItemsPayload | CurrencyPayload;
};

const rootReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { id: (action.payload as CartItemsPayload).productId, quantity: 1 },
        ],
      };
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== (action.payload as CartItemsPayload).productId
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
