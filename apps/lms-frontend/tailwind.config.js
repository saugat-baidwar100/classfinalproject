const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
<<<<<<< HEAD
const { nextui } = require('@nextui-org/react');
=======
const {nextui} = require("@nextui-org/react");
>>>>>>> 94bc266f6658a65dcbbfd75692e31a1c521d0dca

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
      '.../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
