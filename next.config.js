/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["example.com", "example-cdn.com"],
	},
};

module.exports = nextConfig;
