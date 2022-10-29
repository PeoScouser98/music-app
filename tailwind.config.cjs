/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}", "./src/**/*.{html,js}"],
	theme: {
		daisyui: {
			themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
		},
		containerQuery: {
			xs: '120px',
			sm: '240px',
			md: '360px',
		},
		containerType: {
			size: 'size',
		},
		screens: {
			xs: {
				min: "300px",
				max: "374px"
			},
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
			xxl: { min: "1920px" },
		},
		extend: {
			colors: {
				'primary': "var(--p)",
			},
			animation: {
				fadeInOut: "fadeIn .3s linear, fadeOut 1s linear 1s forwards",
				jumping: "jumping 1.2s linear infinite",
				spin: "spin 1.2s ease infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateX(50%)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeOut: {
					"100%": { transform: "translateY(-75%)", opacity: "0" },
				},
				jumping: {
					"0%": { height: "10%" },
					"50%": { height: "50%" },
					"100%": { height: "10%;" },
				},
				spin: {
					"0%": { transform: "rotate(0turn)" },
					"100%": { transform: "rotate(1turn)" },
				},
			},
		},
	},
	plugins: [
		require("daisyui"),
		require("tailwindcss-container-query"),
	],
};
