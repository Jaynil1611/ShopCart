import { actions } from "./actions";
import { initialState } from "../contexts";
import { getUpdatedCategoryList } from "../utils";

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
