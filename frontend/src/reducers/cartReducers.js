import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (data) => data.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((data) =>
            data.product === existItem.product ? item : data
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems : state.cartItems.filter(data => data.product !== action.payload)
      }
    default:
      return state;
  }
};
