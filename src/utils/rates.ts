import { Metafield } from "@shopify/hydrogen-react/storefront-api-types";
import { RatesCount } from "types/metafields";

export const calculateAvergeRating = (rates: Metafield) => {
  const value: RatesCount = JSON.parse(rates?.value || "{}");
  const totalRates = Object.values(value).reduce((value, acc) => parseInt(value) + parseInt(acc), 0) || 0;

  if (!(totalRates > 0)) {
    return 0;
  }

  /* 
   * Average Rating calculation - Equation: AR = (1*a + 2*b + 3*c + 4*d + 5*e) / RT
   * Reference: https://calculator.academy/average-rating-calculator-star-rating/
   */
  const ratesCount = (
    1 * parseInt(value.one) +
    2 * parseInt(value.two) +
    3 * parseInt(value.three) +
    4 * parseInt(value.four) +
    5 * parseInt(value.five)
  )

  return parseFloat((ratesCount / totalRates).toFixed(2));
}