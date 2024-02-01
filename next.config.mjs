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
			{
				protocol: "https",
				hostname: "media.istockphoto.com",
			},
			{
				protocol: "http",
				hostname: "localhost:3000/96d4628b-5e63-4587-abde-8f3479d3642b)",
			}
		],
	},
};

export default nextConfig;
