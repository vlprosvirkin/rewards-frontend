"use server";

export const getTasks = async () => {
	const req = await fetch("http://3.75.92.239:5000/v1/quests");
	const data = req.json();

	return data;
};
