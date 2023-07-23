/** @type {import('next').NextConfig} */
const nextConfig = {
	darkMode: ["class", '[data-mode="dark"]'],
	images: {
		domains: ["example.com", "example-cdn.com"],
	},
};

module.exports = nextConfig;
