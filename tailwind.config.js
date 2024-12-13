/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gold-300": "	#e8c670",
        "gold-500": "#b88e2f",
        "gold-600": "#a67c28",
      },
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1595846723416-99a641e1231a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
    },
  },
  plugins: [],
};
