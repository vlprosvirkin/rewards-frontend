"use server";

export const getTasks = async () => {
  const req = await fetch("http://52.58.234.224:5000/v1/quests");
  const data = req.json();

  return data;
};
