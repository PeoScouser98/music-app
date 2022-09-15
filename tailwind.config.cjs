/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["*.html", "./src/**/*.{html,js}"],
	theme: {
		screens: {
			sm: {
				min: "375px",
				max: "767px",
			},

			md: {
				min: "768px",
				max: "1023px",
			},

			lg: {
				min: "1024px",
				max: "1365px",
			},

			xl: { min: "1366px" },
		},
		extend: {
			animation: {
				fadeInOut: "fadeIn .3s linear, fadeOut .3s linear 1s forwards",
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
