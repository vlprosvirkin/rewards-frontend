export const shortenAddress = (address: string, chars = 4) => {
  if (!address) return "...";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
