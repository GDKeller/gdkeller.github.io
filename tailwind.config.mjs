/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				bayon: ['Bayon', 'sans-serif'],
				bokor: ['Bokor', 'serif'],
				marker: ['Permanent Marker', 'sans-serif'],
				prompt: ['Prompt', 'sans-serif'],
			},
			spacing: {
				'18': '4.5rem',  // 72px - 9 × 8px
				'28': '7rem',    // 112px - 14 × 8px
				'36': '9rem',    // 144px - 18 × 8px
				'40': '10rem',   // 160px - 20 × 8px
			},
			fontSize: {
				// Display sizes (Hero, major statements)
				'display-sm': ['2rem', { lineHeight: '2.5rem' }],      // 32px/40px
				'display-md': ['3rem', { lineHeight: '3.5rem' }],      // 48px/56px
				'display-lg': ['4rem', { lineHeight: '4.5rem' }],      // 64px/72px
				'display-xl': ['5rem', { lineHeight: '5.5rem' }],      // 80px/88px
				// Headings (Section titles)
				'h1': ['3rem', { lineHeight: '3.5rem' }],              // 48px/56px
				'h2': ['2.5rem', { lineHeight: '3rem' }],              // 40px/48px
				'h3': ['2rem', { lineHeight: '2.5rem' }],              // 32px/40px
				'h4': ['1.5rem', { lineHeight: '2rem' }],              // 24px/32px
				// Body text
				'body-lg': ['1.25rem', { lineHeight: '2rem' }],        // 20px/32px
				'body': ['1rem', { lineHeight: '1.5rem' }],            // 16px/24px
				'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px/20px
				'body-xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px/16px
				'body-2xs': ['0.6875rem', { lineHeight: '1rem' }],     // 11px/16px
			},
		},
	},
	plugins: [
		require('daisyui'),
	],
}
