import { MetaobjectField } from "@shopify/hydrogen-react/storefront-api-types";
import { RatesCount } from "types/metafields";

interface customRateMetafield {
  id: string;
  handle: string;
  fields: MetaobjectField[];
}

/* 
* Average Rating calculation - Equation: AR = (1*a + 2*b + 3*c + 4*d + 5*e) / RT
* Reference: https://calculator.academy/average-rating-calculator-star-rating/
*/
export const calculateAvergeRating = (rates: customRateMetafield) => {
  if (!rates) {
    return 0;
  }

  const { fields } = rates;
  const totalRates = Object.values(fields).reduce((value, acc) => value + parseInt(acc.value), 0) || 0;

  const ratesCount = fields.reduce((acc, field) => {
    return acc + parseInt(field.value) * RatesCount[field.key];
  }, 0)

  return parseFloat((ratesCount / totalRates).toFixed(2));
}