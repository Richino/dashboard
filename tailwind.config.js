/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				"shadow-container": "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px",
			},
		},
		screens: {
			"small-phone": { max: "320px" },
			tablet: "768px",
			"laptop-sm": "1024px",
			"laptop-lg": "1440px",
			"small-tablet": { max: "768px" },
		},
	},
	darkMode: "class",
	plugins: [require("@tailwindcss/line-clamp")],
};
