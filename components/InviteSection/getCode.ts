import axios from "axios";

interface props {
  address: string;
}

export const getCode = async (address: string) => {
  console.log("acc:", address);
  console.log("acc length:", address.length);
  const { data } = await axios.get(
    `https://api-rewards.aspis.finance/v1/users/${address}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  return data;
};
