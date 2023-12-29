import { customRateMetafield, RatesCount } from '@appTypes/metafields';

export const calculateAvergeRating = (rates: customRateMetafield) => {
	if (!rates || !rates?.fields) {
		return 0;
	}
	const { fields } = rates;

	const totalRates =
		Object.values(fields).reduce(
			(value, acc) => value + parseInt(acc.value),
			0
		) || 0;

	const ratesCount = fields.reduce((acc, field) => {
		return acc + parseInt(field.value) * RatesCount[field.key];
	}, 0);

	if (totalRates > 0) {
		return parseFloat((ratesCount / totalRates).toFixed(2));
	}

	return 0;
};
