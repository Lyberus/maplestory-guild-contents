/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 중요: 다크 모드 활성화 방식
  theme: {
    extend: {
      colors: {
        "primary": "#5048e5",
        "primary-dark": "#3e38b3",
        "background-light": "#f6f6f8",
        "background-dark": "#121121",
        "surface-light": "#ffffff",
        "surface-dark": "#1e1d2e",
        "border-light": "#e5e7eb",
        "border-dark": "#2e2d3e",
      },
      fontFamily: {
        sans: ["'Pretendard Variable'", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}