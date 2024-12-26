const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'small-size': '16px',
        'medium-size': '20px',
        'big-size': '36px',
      },
      colors: {
        'custom-teal': '#31B991',
        'custom-dark-teal': '#289675',
        'custom-black': '#000000',
        'custom-white': '#ffffff',
        'customGreen': '#3EBD98',
        'customRed': '#F51A1A',
        'customGray': '#9D9D9D',
      },
    },
  },
  plugins: [nextui()],
};
