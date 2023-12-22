/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"custom-red": "#FF5154",
				"custom-grey": "#EBECEF",
				"custom-text-color": "#363635",
				"custom-white": "#FFFFFC",
				"custom-theme": "#282a36",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["business", "dracula"],
	},
};
