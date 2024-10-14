"use server";

import axios from "axios";

axios.defaults.withCredentials = true;

interface props {
  address: string;
}

export const getCode = async (address: string) => {
  if (!address) {
    return null;
  }
  const { data } = await axios.get(
    `https://api-rewards.aspis.finance/v1/users/${address}`,
    {
      headers: {
        accept: "application/json",
        withCredentials: true,
      },
    }
  );

  return data;
};

export const upgradeChar = async (account: string) =>
  await axios.post("https://api-rewards.aspis.finance/v1/users/upgradeChar", {
    address: account,
    withCredentials: true,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const mint = async (recipientAddress: string) => {
  const { data } = await axios.get(
    "https://api-rewards.aspis.finance/v1/users/mint/" + recipientAddress,
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        accept: "application/json",
      },
    }
  );
  return data;
};

export const setRef = async (referralLink: string, account: string) => {
  const { data } = await axios
    .post(`https://api-rewards.aspis.finance/v1/users/referral/${account}`, {
      referral: referralLink,
      user: account,
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  console.log(data);
  return data;
};
