export const groupArrayObjectsByGroupSize = (
	array: unknown[],
	groupSize: number
) => {
	if (!array) {
		return undefined;
	}

	const groupedFields = [];

	for (let i = 0; i < array.length; i += groupSize) {
		groupedFields.push(array.slice(i, i + groupSize));
	}

	return groupedFields;
};
