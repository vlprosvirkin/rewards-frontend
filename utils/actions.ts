"use server";

interface props {
	address: string;
	referral: string;
}

export const registerUser = async ({ address, referral }: props) => {
	const req = await fetch("http://3.75.92.239:5000/v1/users/register", {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			address: `${address}`,
			referral: `${referral}`,
		}),
	});

	const res = await req.json();

	return res;
};
