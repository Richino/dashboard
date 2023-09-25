/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["example.com", "example-cdn.com", "images.igdb.com"],
	},
};

module.exports = nextConfig;
