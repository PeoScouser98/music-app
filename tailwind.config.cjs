/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["*.html", "./src/**/*.{html,js}"],
	theme: {
		screens: {
			sm: "375px",

			md: "768px",

			lg: "1024px",

			xl: "1366px",
		},
		extend: {
			animation: {
				fadeInOut: "fadeIn .3s linear, fadeOut .3s 2s linear  forwards",
				fadeOut: "fadeOut 1s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateX(50%)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeOut: {
					"100%": { transform: "translateY(-200%)", opacity: "0" },
				},
			},
		},
	},
	plugins: [require("daisyui")],
};
