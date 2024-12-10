/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        'custom-width': '31.125rem',  // Define your custom width here
        'half-screen': '50vw',    // Example for half the viewport width
      },
      height:{
        'custom-height': '4.4375rem',  // Define your custom height here

      },
    },
  },
  plugins: [],
}

