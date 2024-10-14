/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/api/:path*", // Match all API routes
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // Replace this with your actual origin
					{ key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
					{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
				],
			},
			{
				source: "/(.*).(png|jpg|jpeg|gif|svg)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},

	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
