import React from 'react';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { LayoutPosition } from 'chart.js';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

const options = {
	scale: {
		ticks: {
			beginAtZero: true,
			max: 10,
			min: 0,
			stepSize: 1,
		},
	},
	elements: {
		line: {
			tension: 0.1,
		},
		point: {
			radius: 2,
			hitRadius: 20,
			hoverRadius: 4,
		},
	},
	plugins: {
		legend: {
			display: true,
			position: 'bottom' as LayoutPosition,
			// align: "start"
		},
	},
};

const parseKey = (key: string) => {
	return key.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) {
		return key.toUpperCase();
	});
};

type RadarChartProps = {
	fields: {
		key: string;
		value: string;
	}[];
};

const RadarChart = ({ metaobject }: { metaobject: RadarChartProps }) => {
	const metaobjectValues = metaobject?.fields
		?.filter(field => parseFloat(field.value) !== 0)
		.map(metafield => parseFloat(metafield?.value));
	const metaobjectLabels = metaobject?.fields
		?.filter(field => parseFloat(field.value) !== 0)
		.map(metafield => parseKey(metafield?.key));
	const averageData = metaobjectValues?.map(
		() =>
			metaobjectValues.reduce((acc, value) => acc + value, 0) /
			metaobjectValues.length
	);
	const comertialCoffees = metaobjectValues?.map((value, index) => {
		if (index > 7) {
			return 1;
		} else if (index > 5) {
			return 5;
		} else {
			return 7;
		}
	});

	const data = {
		labels: metaobjectLabels,
		datasets: [
			{
				label: 'Este Café',
				data: metaobjectValues,
				backgroundColor: 'rgba(251, 146 , 60, 0.2)',
				borderColor: 'rgba(251, 146 , 60, 1)',
				borderWidth: 1,
			},
			{
				label: 'Cafés Comerciales',
				data: comertialCoffees,
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				borderColor: 'rgba(0, 0, 0, 0.5)',
				borderWidth: 0.5,
			},
			{
				label: 'Promedio de Especialidad',
				data: averageData,
				backgroundColor: 'rgba(63, 116, 220, 0.2)',
				borderColor: 'rgba(63, 116, 220, 0.7)',
				borderWidth: 0.5,
			},
		],
	};
	return (
		<Radar
			data={data}
			options={options}
		/>
	);
};
export default RadarChart;
