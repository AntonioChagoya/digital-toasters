import '@testing-library/jest-dom'
import { describe } from "node:test";
import { groupArrayObjectsByGroupSize } from "@utils/arrays";

const dataSetArray = [
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
  { key: "key4", value: "value4" },
  { key: "key5", value: "value5" },
  { key: "key6", value: "value6" },
  { key: "key7", value: "value7" },
  { key: "key5", value: "value5" },
  { key: "key6", value: "value6" },
  { key: "key7", value: "value7" },
  { key: "key5", value: "value5" },
  { key: "key6", value: "value6" },
  { key: "key7", value: "value7" },
]

const dataSetGroupSize = [{ groupSize: 3 }, { groupSize: 3 }, { groupSize: 4 }, { groupSize: 5 }, { groupSize: 6 }, { groupSize: 7 }]

describe("Array grouping function - Array.reduce {...spread}", () => {
  it.each(dataSetGroupSize)('Should return an array grouped with $groupSize number of objects each', () => {
    const GROUP_SIZE = 3
    const groupedArray = groupArrayObjectsByGroupSize(dataSetArray, GROUP_SIZE)

    expect(Array.isArray(groupedArray)).toBe(true);

    groupedArray.forEach(arr => {
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(GROUP_SIZE);
    });
  })
})

