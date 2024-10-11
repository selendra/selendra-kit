const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const SampleAssetToken = await hre.ethers.getContractFactory("SampleAssetToken");
    const sampleAssetToken = await SampleAssetToken.deploy("Sample Asset Token", "SAT");

    await sampleAssetToken.deployed();

    console.log("SampleAssetToken deployed to:", sampleAssetToken.address);

    // Save the contract address to a file
    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify({ SampleAssetToken: sampleAssetToken.address }, undefined, 2)
    );

    // Copy the contract artifact
    const artifactDir = path.join(__dirname, "..", "artifacts", "contracts");
    const contractArtifact = path.join(artifactDir, "SampleAssetToken.sol", "SampleAssetToken.json");
    fs.copyFileSync(contractArtifact, path.join(contractsDir, "SampleAssetToken.json"));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });