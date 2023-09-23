/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["Lato", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "primary": colors.orange[400],
        "ligth": colors.gray[500],
        "secondary": colors.gray[900],
        "accent": colors.yellow[500],
        "info": colors.blue[600],
        "warning": colors.red[500],
        "error": colors.red[800],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'base' }),
    require('@tailwindcss/typography'),
  ],
}
