export const getUpdatedCategoryList = (list, value) => {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : list.concat(value);
};
