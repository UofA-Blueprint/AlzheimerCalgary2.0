/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#6EC2E4",
					main: "#009FDF",
					dark: "#007BAC",
				},
				secondary: {
					light: "#297633",
					main: "#39B54A",
					dark: "#8AE196",
				},
				accent: "#F8EF45",
				status: {
					red: {
						main: "#F05555",
						light: "#FFE5E5",
					},
					blue: {
						main: "#0063F7",
						light: "#E5F0FF",
					},
					green: {
						main: "#3BE08E",
						light: "#E3FFF1",
					},
					yellow: {
						main: "#FFCC00",
						light: "#FFFEE5",
					},
					orange: {
						main: "#FF8800",
						light: "#FFF8E5",
					},
				},
				neutrals: {
					dark: {
						100: "#C7C9D9",
						200: "#8F90A6",
						300: "#555770",
						400: "#28293D",
						500: "#1C1C28",
					},
					light: {
						100: "#FFFFFF",
						200: "#FAFAFC",
						300: "#F2F2F5",
						400: "#EBEBF0",
						500: "#E4E4EB",
					},
				},
				profile: {
					tulip: "#F68F8F",
					gold: "#F1C38D",
					lime: "#F4FAAE",
					jade: "#B8F1B6",
					water: "#D0E4FF",
					air: "#A7E4FC",
					lilac: "#E6BFFF",
					candy: "#F6AEDE",
				},
			},
			fontFamily: {
				display: ['"Proxima Nova"', "sans-serif"],
				body: ['"Helvetica Now Display"', "sans-serif"],
			},
		},
	},
	plugins: [],
};
