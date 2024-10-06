export async function POST(request: Request) {
	const data = await request.json();
	console.log("Data", data.telegramId);

	return Response.json({ ok: true });
}
