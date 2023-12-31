const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: ['hover'],
      fontFamily: {
        rta: ["RTA", "cursive"],
        vina: ['Vina Sans', "cursive"],
      },

    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});