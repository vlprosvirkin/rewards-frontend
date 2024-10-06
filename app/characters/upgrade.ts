export const lvlUp = async (address: any) => {
  console.log("address", address);
  const req = await fetch("http://3.75.92.239:5000/v1/users/upgradeChar", {
    method: "POST",
    body: JSON.stringify({ address: address }),
  });

  const res = await req.json();

  return res;
};
