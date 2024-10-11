require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SELENDRA_PRIVATE_KEY = process.env.SELENDRA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        selendraMainnet: {
            url: "https://rpc.selendra.org",
            chainId: 1961,
            accounts: SELENDRA_PRIVATE_KEY ? [SELENDRA_PRIVATE_KEY] : [],
        },
        selendraTestnet: {
            url: "https://testnet-rpc.selendra.org",
            chainId: 1953,
            accounts: SELENDRA_PRIVATE_KEY ? [SELENDRA_PRIVATE_KEY] : [],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};