export const formatBalance = (rawBalance: string) => {
	const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
	return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
	const chainIdNum = parseInt(chainIdHex);
	return chainIdNum;
};

export const formatAddress = (addr: string) => {
	const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
	return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(
		39
	)}`;
};

// Describes metadata related to a provider based on EIP-6963.
export interface EIP6963ProviderInfo {
	rdns: string;
	uuid: string;
	name: string;
	icon: string;
}

// Represents the structure of a provider based on EIP-1193.
export interface EIP1193Provider {
	isStatus?: boolean;
	host?: string;
	path?: string;
	sendAsync?: (
		request: { method: string; params?: Array<unknown> },
		callback: (error: Error | null, response: unknown) => void
	) => void;
	send?: (
		request: { method: string; params?: Array<unknown> },
		callback: (error: Error | null, response: unknown) => void
	) => void;
	request: (request: {
		method: string;
		params?: Array<unknown>;
	}) => Promise<unknown>;
}

// Combines the provider's metadata with an actual provider object, creating a complete picture of a
// wallet provider at a glance.
export interface EIP6963ProviderDetail {
	info: EIP6963ProviderInfo;
	provider: EIP1193Provider;
}

// Represents the structure of an event dispatched by a wallet to announce its presence based on EIP-6963.
export type EIP6963AnnounceProviderEvent = {
	detail: {
		info: EIP6963ProviderInfo;
		provider: Readonly<EIP1193Provider>;
	};
};

// An error object with optional properties, commonly encountered when handling eth_requestAccounts errors.
export interface WalletError {
	code?: string;
	message?: string;
}
