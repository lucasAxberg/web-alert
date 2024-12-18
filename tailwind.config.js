/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@catppuccin/tailwindcss")({
    prefix: "ctp",

    defaultFlavour: "macchiato"
    }),
  ],
}

