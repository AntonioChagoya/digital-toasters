
export const groupArrayObjectsByGroupSize = (array: any[], groupSize: number) => {
  const groupedFields = array?.reduce((acc, _, index) => {
    if (index % groupSize === 0) {
      return [...acc, [array[index], array[index + 1], array[index + 2]]]
    }
    return acc;
  }, [])

  return groupedFields
}

