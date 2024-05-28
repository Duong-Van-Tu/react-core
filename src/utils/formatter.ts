export const currencyFormatter = (value: number) => {
  if (!value) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const currencyParser = (value: number) => {
  return `${value}`?.replace(/\$\s?|(\.*)/g, '');
};
