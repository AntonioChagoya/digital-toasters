/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		domains: ['127.0.0.1'],
	},
	i18n: {
		locales: ['es-MX', 'en'],
		defaultLocale: 'es-MX',
		localeDetection: false,
	},
	reactStrictMode: true,
};
