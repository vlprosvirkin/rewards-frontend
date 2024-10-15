import { Web3Wallet, IWeb3Wallet } from "@walletconnect/web3wallet";
import { Core } from "@walletconnect/core";
export { IWeb3Wallet };

export async function createWeb3Wallet(): Promise<IWeb3Wallet> {
  const core = new Core({
    projectId: "03ffba50a91695b225039734af4d099e",
    relayUrl: "wss://relay.walletconnect.com",
  });
  const web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: "Aspis",
      description: "Aspis DAO Wallet",
      url: "https://app.aspis.finance/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });

  try {
    const clientId =
      await web3wallet.engine.signClient.core.crypto.getClientId();
    console.log("WalletConnect ClientID: ", clientId);
    window?.localStorage?.setItem("WALLETCONNECT_CLIENT_ID", clientId);
  } catch (error) {
    console.error(
      "Failed to set WalletConnect clientId in localStorage: ",
      error
    );
  }

  return web3wallet;
}
