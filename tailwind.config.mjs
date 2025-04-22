/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				bayon: ['Bayon', 'sans-serif'],
				kings: ['Kings', 'sans-serif'],
				bokor: ['Bokor', 'serif'],
				medieval: ['MedievalSharp', 'sans-serif'],
				marker: ['Permanent Marker', 'sans-serif'],
				prompt: ['Prompt', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('daisyui'),
	],
}
