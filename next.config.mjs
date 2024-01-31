/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "griphy.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "img.freepik.com/free-vector",
			},
			{
				protocol: "https",
				hostname: "media.istockphoto.com",
			},
		],
	},
};

export default nextConfig;
