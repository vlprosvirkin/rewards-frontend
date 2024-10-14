export const lvlUp = async (address: any) => {
  console.log("address", address);
  const req = await fetch(
    "https://api-rewards.aspis.finance/v1/users/upgradeChar",
    {
      method: "POST",
      body: JSON.stringify({ address: address }),
    }
  );

  const res = await req.json();

  return res;
};
