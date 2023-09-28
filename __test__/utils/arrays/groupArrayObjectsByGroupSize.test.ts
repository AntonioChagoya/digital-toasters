import { groupArrayObjectsByGroupSize } from "@utils/arrays";

describe("Group objecs of an array by group size", () => {
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

  const dataSetGroupSize = [
    { groupSize: 3, testCase: 1 },
    { groupSize: 4, testCase: 2 },
    { groupSize: 5, testCase: 3 },
    { groupSize: 6, testCase: 4 },
    { groupSize: 7, testCase: 5 }
  ]

  test.each(dataSetGroupSize)('Test case $testCase - groupArrayObjectsByGroupSize Should return undefined if no array is passed', () => {
    const groupedArray = groupArrayObjectsByGroupSize(null, 3)

    expect(groupedArray).toBe(undefined);
  });

  test.each(dataSetGroupSize)('Test case $testCase - Should be an array', () => {
    const groupedArray = groupArrayObjectsByGroupSize([], 3)

    expect(groupedArray).toBeInstanceOf(Array);
  });

  test.each(dataSetGroupSize)('Test case $testCase - Should return an empty array if the array is empty', () => {
    const groupedArray = groupArrayObjectsByGroupSize([], 3)

    expect(groupedArray).toHaveLength(0);
  });

  test.each(dataSetGroupSize)('Test case $testCase - Should return an array grouped with $groupSize objects each',
    ({ groupSize }) => {
      const groupedArray = groupArrayObjectsByGroupSize(dataSetArray, groupSize)

      expect(groupedArray).toHaveLength(Math.ceil(dataSetArray.length / groupSize));

      groupedArray
        .forEach((arr, index) => {
          expect(Array.isArray(arr)).toBe(true);

          if (index === groupedArray.length - 1) {
            expect(arr).toHaveLength(dataSetArray.length % groupSize);
            return;
          } else {
            expect(arr).toHaveLength(groupSize);
          }
        });
    });
})

