import { Metafield } from "@shopify/hydrogen-react/storefront-api-types";

export const groupArrayObjectsByGroupSize = (array: any[], groupSize: number) => {
  const groupedFields = array?.reduce((acc, _, index) => {
    if (index % groupSize === 0) {
      return [...acc, [array[index], array[index + 1], array[index + 2]]]
    }
    return acc;
  }, [])

  return groupedFields
}

export const filterIdsFromMetafieldsArrayByKeysArray = (metafields: Metafield[], keys: string[]) => {
  return metafields?.reduce((acc, metafield) => {
    if (keys.includes(metafield.key)) {
      return [...acc, { value: metafield.value, key: metafield.key }]
    }
    return acc;
  }, [])

}