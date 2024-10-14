"use server";

export const getTasks = async () => {
  const req = await fetch("https://api-rewards.aspis.finance/v1/quests");
  const data = req.json();

  return data;
};
