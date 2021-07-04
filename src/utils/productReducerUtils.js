export const getUpdatedCategoryList = (list, value) => {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : list.concat(value);
};

export const removeFromList = (list, productId) => {
  return list.filter(({ id }) => id !== productId);
};

export const addToList = (list, product) => {
  return list.concat(product);
};

export const updateQuantity = (list, productId, incOrDec) => {
  return list.map((product) => {
    return product.id === productId
      ? {
          ...product,
          cartQuantity: incOrDec
            ? product.cartQuantity + 1
            : product.cartQuantity - 1,
        }
      : product;
  });
};
