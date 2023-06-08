export function formatNumberFractionalDigits(value: number, digits = 2) {
  const formatNumber = (
    value: number,
    options?: Intl.NumberFormatOptions,
    locale?: string | string[],
  ) => (Number.isNaN(value) ? '' : Intl.NumberFormat(locale, { useGrouping: false, ...options }).format(value));
  return formatNumber(value, { maximumFractionDigits: digits });
}

export const currencyMask = (value: string) => {
  let maskedPrice = value.replace(/\D/g, "");
  maskedPrice = `${(Number(maskedPrice) / 100).toFixed(2)}`;
  maskedPrice = maskedPrice.replace(".", ",");
  maskedPrice = maskedPrice.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  maskedPrice = maskedPrice.replace(/(\d)(\d{3}),/g, "$1.$2,");
  maskedPrice = `R$ ${maskedPrice}`;
  return maskedPrice;
};

export const currencyToValue = (value: string) => {
  return value
    .split("R$")[1]
    .replace(/\D/g, "")
    .replace(",", "")
    .replace(".", "");
};
