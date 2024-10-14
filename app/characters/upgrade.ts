import axios from "axios";

export const lvlUp = async (address: any) => {
  console.log("address", address);
  const { data } = await axios.post(
    "https://api-rewards.aspis.finance/v1/users/upgradeChar",
    {
      address: address,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return data;
};
