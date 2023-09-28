import { customRateMetafield } from "@appTypes/metafields";
import { calculateAvergeRating } from "@utils/rates";

/* 
* Average Rating calculation - Equation: AR = (1*a + 2*b + 3*c + 4*d + 5*e) / RT
* Reference: https://calculator.academy/average-rating-calculator-star-rating/
*/

describe('Test calculateAvergeRating function', () => {
  const averageRatingDataSet = [
    {
      testCase: '1. - Tens',
      result: 3.67,
      customRateMetafield: {
        key: 'rate',
        id: '001',
        handle: 'test-product-001',
        fields: [
          { key: 'one', value: '10', type: 'number' },
          { key: 'two', value: '20', type: 'number' },
          { key: 'three', value: '30', type: 'number' },
          { key: 'four', value: '40', type: 'number' },
          { key: 'five', value: '50', type: 'number' },
        ]
      }
    },
    {
      testCase: '2. - Thousands',
      result: 4.68,
      customRateMetafield: {
        key: 'rate',
        id: '002',
        handle: 'test-product-002',
        fields: [
          { key: 'one', value: '45', type: 'number' },
          { key: 'two', value: '2', type: 'number' },
          { key: 'three', value: '38', type: 'number' },
          { key: 'four', value: '123', type: 'number' },
          { key: 'five', value: '1000', type: 'number' },
        ]
      }
    },
    {
      testCase: '3. - No rates',
      result: 0,
      customRateMetafield: {
        key: 'rate',
        id: '003',
        handle: 'test-product-003',
        fields: [
          { key: 'one', value: '0', type: 'number' },
          { key: 'two', value: '0', type: 'number' },
          { key: 'three', value: '0', type: 'number' },
          { key: 'four', value: '0', type: 'number' },
          { key: 'five', value: '0', type: 'number' },
        ]
      }
    },
    {
      testCase: '4. - Null value',
      result: 0,
      customRateMetafield: null
    },
  ]

  test.each(averageRatingDataSet)('Case $testCase, Should return: $result', ({ customRateMetafield, result }) => {
    expect(calculateAvergeRating(customRateMetafield as customRateMetafield)).toBe(result);
  });
});