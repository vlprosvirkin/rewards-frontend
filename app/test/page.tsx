"use client";

import UserAvatar from "@/components/SessionTest";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

declare const auth: (options: Options, callback: Callback) => void;

interface Options {
	bot_id: string;
	request_access?: string;
	lang?: string;
	bot_domain: string;
	embed: number;
	return_to?: string;
}

interface Data {
	auth_date: number;
	first_name: string;
	hash: string;
	id: number;
	last_name: string;
	username: string;
	// I think there could be other properties too
}

type Callback = (dataOrFalse: Data | false) => void;

declare global {
	interface Window {
		Telegram: any;
		onTelegramAuth: any;
	}
}

export default function Test() {
	const [id, setId] = useState("");
	const { data: session, status } = useSession();

	useEffect(() => {
		window.Telegram.Login.init(
			"widget_login",
			6819890766,
			{ origin: "https://core.telegram.org" },
			false,
			"en"
		);
		window.addEventListener(
			"message",
			function (event) {
				console.log("get message", event);
			},
			false
		);

		() => UserAvatar;
	}, []);

	/* 
	useEffect(() => {
		console.log("auth start");
		window.Telegram.Login.auth(
			{
				bot_id: "547043436",
				request_access: true,
				bot_domain: "https://hedfkoa.pw",
			},
			(data: any) => {
				if (!data) {
					console.log("no data");
				}

				console.log("log data ", data);
			}
		);
	}, []);
    */

	const check = async () => {
		const req = await fetch(
			`https://api.telegram.org/bot6819890766:AAGgUD62cS0DMlRKPmczDUJhd2HwPwTFf84/getChatMember?chat_id=@aspis_chat&user_id=${id}`
		);
		const res = await req.json();

		console.log("Result: ", res);
	};

	return (
		<main className="flex flex-col w-full">
			<div className="mx-auto flex flex-col gap-4">
				<input type="number" onChange={(e) => setId(e.target.value)} />
				<button className=" bg-white text-black px-4 py-2" onClick={check}>
					Check sub to telegram chat
				</button>

				<button
					className=" bg-white text-black px-4 py-2"
					onClick={() =>
						window.Telegram.Login.auth(
							{ bot_id: "6819890766" },
							(data: any) => {
								if (data) {
									console.log("login data: ", data);
								}
							}
						)
					}
					/*
					onClick={() =>
						window.Telegram.Login.auth(
							{
								bot_id: "547043436",
							},
							(data: any) => {
								if (!data) {
									console.log("no data");
								}

								console.log("log data ", data);
							}
						)
					}
                    */
				>
					Login via Telegram
				</button>
				<button
					onClick={() => UserAvatar()}
					className=" bg-white text-black px-4 py-2"
				>
					Log sessions (server side)
				</button>

				<div className="flex flex-col gap-4 bg-white text-black px-3 py-1">
					{session?.user?.name}
				</div>

				<div className="flex flex-col gap-4 bg-white text-black px-3 py-1">
					
				</div>
			</div>
		</main>
	);
}
