/** @type import('hardhat/config').HardhatUserConfig */
import dotenv from "dotenv";
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.20",
	networks: {
		polygon: {
			url: process.env.RPC_URL,
			accounts: [process.env.PKEY],
		},
	},
	etherscan: {
		//POLYGONSCAN_API_KEY apiKey: process.env.ETHERSCAN_API_KEY,
		apiKey: process.env.POLYGONSCAN_API_KEY, // Add your Etherscan API key here
	},
};
