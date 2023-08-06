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
			gridTemplateRows: {
				layout: "repeat(36, minmax(0, 80px))",
			},
			gridRowStart: {
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				14: "14",
				15: "15",
				16: "16",
				17: "17",
				18: "18",
				19: "19",
				20: "20",
				21: "21",
				22: "22",
				23: "23",
				24: "24",
				25: "25",
				26: "26",
				27: "27",
				28: "28",
				29: "29",
				30: "30",
				31: "31",
				32: "32",
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
