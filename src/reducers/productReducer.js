import { actions } from "./actions";
import { initialState } from "../contexts";
import {
  addToList,
  getUpdatedCategoryList,
  removeFromList,
  updateQuantity,
} from "../utils";

const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case actions.INITIALIZE_LIST:
      return {
        ...prevState,
        [payload.name]: payload.data,
      };
    case actions.PRICE_HIGH_TO_LOW:
      return {
        ...prevState,
        sortBy: actions.PRICE_HIGH_TO_LOW,
      };
    case actions.PRICE_LOW_TO_HIGH:
      return {
        ...prevState,
        sortBy: actions.PRICE_LOW_TO_HIGH,
      };
    case actions.UPDATE_CATEGORY_FILTERS: {
      const { category, value } = payload;
      return {
        ...prevState,
        filters: {
          ...prevState.filters,
          [category]: getUpdatedCategoryList(
            prevState.filters[category],
            value
          ),
        },
      };
    }
    case actions.ADD_TO_CART: {
      return {
        ...prevState,
        cartList: addToList(prevState.cartList, payload.product),
      };
    }
    case actions.REMOVE_FROM_CART: {
      return {
        ...prevState,
        cartList: removeFromList(prevState.cartList, payload.productId),
      };
    }
    case actions.ADD_TO_SAVE_FOR_LATER: {
      return {
        ...prevState,
        cartList: removeFromList(prevState.cartList, payload.product.id),
        savedForLater: addToList(prevState.savedForLater, payload.product),
      };
    }
    case actions.MOVE_FROM_SAVE_FOR_LATER_TO_CART: {
      return {
        ...prevState,
        cartList: addToList(prevState.cartList, payload.product),
        savedForLater: removeFromList(
          prevState.savedForLater,
          payload.product.id
        ),
      };
    }
    case actions.REMOVE_FROM_SAVE_FOR_LATER: {
      return {
        ...prevState,
        savedForLater: removeFromList(
          prevState.savedForLater,
          payload.productId
        ),
      };
    }
    case actions.UPDATE_CART_QUANTITY: {
      return {
        ...prevState,
        cartList: updateQuantity(
          prevState.cartList,
          payload.productId,
          payload.incOrDec
        ),
      };
    }
    case actions.CLEAR_ALL_FILTERS:
      return {
        ...prevState,
        filters: {
          ...initialState.filters,
        },
        sortBy: initialState.sortBy,
      };
    case actions.RESET_STATE: {
      return {
        ...prevState,
        ...initialState,
      };
    }
    default:
      return prevState;
  }
};

export default productReducer;
