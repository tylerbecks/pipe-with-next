const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export const formatCurrency = (num: number) => currencyFormatter.format(num);
