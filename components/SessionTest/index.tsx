"use server";

import { auth } from "@/auth";

export default async function UserAvatar() {
	const session = await auth();

	console.log("SESSION:: ", session?.user);

	if (!session?.user) return null;
}
