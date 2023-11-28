/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"custom-red": "#FF5154",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["business", "dracula"],
	},
};
