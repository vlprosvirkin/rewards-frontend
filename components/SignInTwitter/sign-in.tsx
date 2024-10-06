"use server";

import { signIn } from "@/auth";

export async function signInWithTwitter() {
	await signIn("twitter");
}

export async function signInWithDiscord() {
	await signIn("discord");
}
