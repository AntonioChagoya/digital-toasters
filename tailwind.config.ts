/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/hooks/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/views/**/*.{js,ts,jsx,tsx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx}',
		'./src/theme/**/*.{js,ts,jsx,tsx}',
		'./src/context/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				default: ['Lato', ...defaultTheme.fontFamily.mono],
			},
			colors: {
				primary: colors.orange[400],
				ligth: colors.gray[400],
				secondary: colors.gray[900],
				accent: colors.yellow[500],
				info: colors.blue[600],
				warning: colors.red[500],
				error: colors.red[800],
			},
			spacing: {
				section: '1100px',
			},
			gap: {
				layoutPublic: '5rem',
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')({ strategy: 'base' }),
		require('@tailwindcss/typography'),
	],
};
