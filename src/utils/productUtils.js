import { actions } from "../reducers";

export const getUnique = (list, item) => {
  return list.reduce((result, current) => {
    if (Array.isArray(current[item])) {
      current[item].forEach((elem) => {
        if (!result.includes(elem)) {
          result.push(elem);
        }
      });
      return result;
    }
    return result.includes(current[item])
      ? result
      : result.concat(current[item]);
  }, []);
};

export const getBrandProducts = (productList, category) => {
  return category.length > 0
    ? productList.filter(({ brand }) => category.includes(brand))
    : productList;
};

export const getSizeProducts = (productList, category) => {
  return category.length > 0
    ? productList.filter(({ size }) =>
        Array.isArray(size)
          ? size.some((s) => category.includes(s))
          : category.includes(size)
      )
    : productList;
};

export const getIdealProducts = (productList, category) => {
  return category.length > 0
    ? productList.filter(({ idealFor }) => category.includes(idealFor))
    : productList;
};

export const getSortedProducts = (productList, sortBy) => {
  return sortBy === actions.PRICE_LOW_TO_HIGH
    ? [...productList].sort(
        (item1, item2) => Number(item1.price) - Number(item2.price)
      )
    : sortBy === actions.PRICE_HIGH_TO_LOW
    ? [...productList].sort(
        (item1, item2) => Number(item2.price) - Number(item1.price)
      )
    : productList;
};

export const checkProductExists = (list, productId) => {
  return list.find(({ id }) => id === productId);
};
