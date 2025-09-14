module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				blue: '#2997FF',
				gray: {
					DEFAULT: '#86868b',
					100: '#94928d',
					200: '#afafaf',
					300: '#42424570',
				},
				zinc: '#101010',
			},
		},
	},
	plugins: [],
}
