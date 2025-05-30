import { heroui } from "@heroui/react";
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding:'1rem'
    },
    extend: {
      colors: {
        main: '#3499ff',
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        'iransansNum': ['IRANSansXFaNum', 'sans-serif'],
        sans: [
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32'
          },
        ],
      },
    },
  },
  plugins: [heroui()],
};
