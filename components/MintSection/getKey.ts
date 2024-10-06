"use server";

export const getKey = async () => {
	const key = process.env.PKEY;

	return key;
};

export const getRpcUrl = async () => {
	const key = process.env.RPC_URL;

	return key;
};
