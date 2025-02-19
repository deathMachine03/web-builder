/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    corePlugins: {
      preflight: false, // Отключает глобальные стили Tailwind
    },
  };
  