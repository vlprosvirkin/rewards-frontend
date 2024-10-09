export const lvlUp = async (address: any) => {
  console.log("address", address);
  const req = await fetch("http://52.58.234.224:5000/v1/users/upgradeChar", {
    method: "POST",
    body: JSON.stringify({ address: address }),
  });

  const res = await req.json();

  return res;
};
