"use server";

export const getLeaderboard = async () => {
  const req = await fetch("http://52.58.234.224:5000/v1/users/top?type=month", {
    headers: {
      accept: "application/json",
    },
  });

  const res = await req.json();

  return res;
};
