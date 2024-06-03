/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
			  'main-brown': '#574533',
			  'back-pink': '#fef9fa',
			  'forward-pink': '#f3dfe1',
			},
		},
		backgroundImage: {
			'maintenance': "url('/images/statics/maintenance.jpg')",
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}
