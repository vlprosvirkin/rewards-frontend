"use server";
interface props {
  address: string;
}

export const getCode = async (address: string) => {
  console.log("acc:", address);
  console.log("acc length:", address.length);
  const req = await fetch(`http://52.58.234.224:5000/v1/users/${address}`, {
    headers: {
      accept: "application/json",
    },
  });

  const res = await req.json();

  return res;
};
