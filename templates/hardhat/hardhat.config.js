require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SELENDRA_PRIVATE_KEY = process.env.SELENDRA_PRIVATE_KEY;

task("compile", "Compiles the entire project, building all artifacts", async (taskArgs, hre, runSuper) => {
    await runSuper(taskArgs);
    console.log("\nSelendra: Compilation successful (Phnom Penh)");
});

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
            url: "https://rpc-testnet.selendra.org", // Corrected URL
            chainId: 1953,
            accounts: SELENDRA_PRIVATE_KEY ? [SELENDRA_PRIVATE_KEY] : [],
        },
    },
};