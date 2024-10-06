import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"custom-gradient":
					"linear-gradient(140.54deg, #FFFFFF 16.02%, rgba(255, 255, 255, 0.27) 82.75%)",
			},
		},
		screens: {
			mobile: "390px",
			// => @media (min-width: 640px) { ... }
			tablet: "840px",
		},
	},
	darkMode: "class",
};
export default config;
