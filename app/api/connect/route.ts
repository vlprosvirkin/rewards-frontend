import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const body = await request.json();
	const wallet = body["wallet"];

	if (wallet) {
		return NextResponse.json({ data: wallet });
	}

	return Response.json({ ok: false });
}
