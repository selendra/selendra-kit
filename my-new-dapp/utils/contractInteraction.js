const ethers = require('ethers');
const { getSelendraProvider, getSelendraWallet } = require('./selendraConfig').default;

async function deployContract(contractJson, constructorArgs = [], privateKey, network = 'mainnet') {
    const wallet = getSelendraWallet(privateKey, network);
    const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
    return contract;
}

async function getContract(contractAddress, contractAbi, signerOrProvider) {
    return new ethers.Contract(contractAddress, contractAbi, signerOrProvider);
}

async function estimateGas(contract, method, args = []) {
    const estimatedGas = await contract.estimateGas[method](...args);
    return estimatedGas.mul(ethers.BigNumber.from(120)).div(ethers.BigNumber.from(100)); // Add 20% buffer
}

async function sendTransaction(contract, method, args = [], options = {}) {
    const estimatedGas = await estimateGas(contract, method, args);
    const tx = await contract[method](...args, { ...options, gasLimit: estimatedGas });
    return tx.wait();
}

module.exports = {
    deployContract,
    getContract,
    estimateGas,
    sendTransaction,
};