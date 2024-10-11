"use server";

export const getLeaderboard = async () => {
  const req = await fetch("https://api-rewards.aspis.finance/v1/users/top?type=month", {
    headers: {
      accept: "application/json",
    },
  });

  const res = await req.json();

  return res;
};
