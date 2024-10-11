import axios from "axios";

interface props {
  address?: string;
  tgId: number;
}

export const linkTgAccount = async ({ address, tgId }: props) => {
  console.log(`sending ${tgId} to ${address}`);

  const { data } = await axios.post(
    `http://52.58.234.224:5000/v1/users/add-ids/${address}`,
    { telegramId: tgId, twitterId: "123456789" }
  );

  return data;
};
