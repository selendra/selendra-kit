import { providers, Wallet } from 'ethers';

const SELENDRA_MAINNET_RPC = 'https://rpc.selendra.org';
const SELENDRA_TESTNET_RPC = 'https://testnet-rpc.selendra.org';

const SELENDRA_MAINNET_CHAIN_ID = 1961;
const SELENDRA_TESTNET_CHAIN_ID = 1953;

function getSelendraProvider(network = 'mainnet') {
    const rpcUrl = network === 'mainnet' ? SELENDRA_MAINNET_RPC : SELENDRA_TESTNET_RPC;
    return new providers.JsonRpcProvider(rpcUrl);
}

function getSelendraWallet(privateKey, network = 'mainnet') {
    const provider = getSelendraProvider(network);
    return new Wallet(privateKey, provider);
}

export default {
    SELENDRA_MAINNET_RPC,
    SELENDRA_TESTNET_RPC,
    SELENDRA_MAINNET_CHAIN_ID,
    SELENDRA_TESTNET_CHAIN_ID,
    getSelendraProvider,
    getSelendraWallet,
};