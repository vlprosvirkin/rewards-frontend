"use server";

import axios from "axios";

export const getLeaderboard = async () => {
  const res = await axios.get(
    "https://api-rewards.aspis.finance/v1/users/top?type=month",
    {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );

  return res?.data;
};
