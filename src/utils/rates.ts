import { RatesCount } from "types/metafields";

export const calculateAvergaRating = (rates: RatesCount) => {
  const totalRates = Object.values(rates).reduce((value, acc) => parseInt(value) + parseInt(acc), 0) || 0;

  if (!(totalRates > 0)) {
    return 0;
  }

  /* 
   * Average Rating calculation - Equation: AR = (1*a + 2*b + 3*c + 4*d + 5*e) / RT
   * Reference: https://calculator.academy/average-rating-calculator-star-rating/
   */
  const ratesCount = (
    1 * parseInt(rates.one) +
    2 * parseInt(rates.two) +
    3 * parseInt(rates.three) +
    4 * parseInt(rates.four) +
    5 * parseInt(rates.five)
  )

  return parseFloat((ratesCount / totalRates).toFixed(2));
}