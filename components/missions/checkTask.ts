"use server";

export const checkTask = async (
  itemId: number | undefined,
  address: string | undefined,
  code: string | undefined
) => {
  const req = await fetch(
    `http://3.75.92.239:5000/v1/quests/complete/${code}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: '{\n  "address": "0x02E06qef1123123azxcFasd0514211eCdd6D6f7A",\n  "props": {\n    "itemId": "1"\n  }\n}',
      body: JSON.stringify({
        address: address,
        props: {
          itemId,
        },
      }),
    }
  );

  const res = await req.json();
  console.log("Result of task completion:", res);
  console.log("StatusCode:", req.status);

  return res;
};
