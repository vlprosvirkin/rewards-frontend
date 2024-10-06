"use server";

import { signIn } from "@/auth";

export const loginTwitter = async () => {
	"use server";
	await signIn("twitter");
};
