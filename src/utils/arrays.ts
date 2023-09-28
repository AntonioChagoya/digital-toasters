export const groupArrayObjectsByGroupSize = (array: any[], groupSize: number) => {
  if (!array) {
    return undefined
  }

  let groupedFields = []

  for (let i = 0; i < array.length; i += groupSize) {
    groupedFields.push(array.slice(i, i + groupSize))
  }

  return groupedFields
}