"use server";
import axios from "axios";

export const checkTask = async (
  itemId: number | undefined,
  address: string | undefined,
  code: string | undefined
) => {
  const { data } = await axios.post(
    `https://api-rewards.aspis.finance/v1/quests/complete/${code}`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: '{\n  "address": "0x02E06qef1123123azxcFasd0514211eCdd6D6f7A",\n  "props": {\n    "itemId": "1"\n  }\n}',
      address: address,
      props: {
        itemId,
      },
    }
  );

  return data;
};
