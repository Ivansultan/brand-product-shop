import { Currency } from "./components/Currencies";
import { Product } from "./pages/ProductPage";

export type AppState = { cartItems: Product["id"][]; currency: Currency };

const initialState: AppState = {
  cartItems: [],
  currency: "USD",
};

type ActionType = "CART_ADD_ITEM" | "CART_REMOVE_ITEM" | "SET_CURRENCY";

type CartItemsPayload = {
  productId: Product["id"];
};

type Action = {
  type: ActionType;
  payload: CartItemsPayload;
};

const rootReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.productId],
      };
    // TODO: write `case "CART_REMOVE_ITEM"`
    default:
      return state;
  }
};

export default rootReducer;
