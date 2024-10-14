"use server";

import axios from "axios";

interface props {
  address: string;
  referral: string;
}

export const registerUser = async ({ address, referral }: props) => {
  const res = await axios.post(
    "https://api-rewards.aspis.finance/v1/users/register",
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      address: address,
      referral: referral,
    }
  );

  return res?.data;
};
