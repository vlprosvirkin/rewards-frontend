/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
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
