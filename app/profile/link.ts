"use server";
interface props {
	address?: string;
	tgId: number;
}

export const linkTgAccount = async ({ address, tgId }: props) => {
	
    console.log(`sending ${tgId} to ${address}`)

	const req = await fetch(
		`http://3.75.92.239:5000/v1/users/add-ids/${address}`,
		{
			method: "POST",
			body: JSON.stringify({ telegramId: tgId, twitterId: "123456789" }),
		}
	);

	const res = await req.json();

	console.log("server response: ", res);
	return res;
};
