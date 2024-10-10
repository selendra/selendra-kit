import { getSelendraProvider, getSelendraWallet } from '../src/utils';

import { ContractFactory, Contract, BigNumber } from 'ethers';

// const { getSelendraProvider, getSelendraWallet } = require('./selendraConfig');

async function deployContract(contractJson, constructorArgs = [], privateKey, network = 'mainnet') {
    const wallet = getSelendraWallet(privateKey, network);
    const factory = new ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
    return contract;
}

async function getContract(contractAddress, contractAbi, signerOrProvider) {
    return new Contract(contractAddress, contractAbi, signerOrProvider);
}

async function estimateGas(contract, method, args = []) {
    const estimatedGas = await contract.estimateGas[method](...args);
    return estimatedGas.mul(BigNumber.from(120)).div(BigNumber.from(100)); // Add 20% buffer
}

async function sendTransaction(contract, method, args = [], options = {}) {
    const estimatedGas = await estimateGas(contract, method, args);
    const tx = await contract[method](...args, { ...options, gasLimit: estimatedGas });
    return tx.wait();
}

export default {
    deployContract,
    getContract,
    estimateGas,
    sendTransaction,
};