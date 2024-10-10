require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SELENDRA_PRIVATE_KEY = process.env.SELENDRA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        selendra: {
            url: "https://rpc.selendra.org",
            chainId: 1961,
            accounts: SELENDRA_PRIVATE_KEY ? [SELENDRA_PRIVATE_KEY] : [],
        },
        selendraTestnet: {
            url: "https://rpc-testnet.selendra.org",
            chainId: 1953,
            accounts: SELENDRA_PRIVATE_KEY ? [SELENDRA_PRIVATE_KEY] : [],
        },
    },
};