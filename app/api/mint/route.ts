import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { recipientAddress } = await req.json();

    const res = await fetch(
      `https://api-rewards.aspis.finance/v1/users/mint/${recipientAddress}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Something went wrong	" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { message: data.message, hash: data.hash },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// backend
