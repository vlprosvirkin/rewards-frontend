"use server";

import axios from "axios";

interface props {
  address?: string;
  tgId: number;
}

export const linkTgAccount = async ({ address, tgId }: props) => {
  console.log(`sending ${tgId} to ${address}`);

  const { data } = await axios.post(
    `https://api-rewards.aspis.finance/v1/users/add-ids/${address}`,
    {
      telegramId: tgId,
      twitterId: "123456789",
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
