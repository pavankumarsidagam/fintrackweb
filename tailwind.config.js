/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /text-(.*)-600/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

