import { MetaobjectField } from '@shopify/hydrogen-react/storefront-api-types';

export enum MetaFieldsKeys {
	stars_rating = 'rate',
	reviews_count = 'reviews',
	notes = 'notas_de_cata',
	info_relevant = 'informacion_relevante',
	info_general = 'informacion_general',
}

export enum MetaFieldsNamespaces {
	default = 'custom',
}
export enum RatesCount {
	'one' = 1,
	'two' = 2,
	'three' = 3,
	'four' = 4,
	'five' = 5,
}

export interface customRateMetafield {
	id: string;
	handle: string;
	fields: MetaobjectField[];
}
