import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getSampleAssetTokenContract, getProviderOrSigner } from '../utils/contractUtils';

export const useContract = () => {
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        const initContract = async () => {
            try {
                const signer = await getProviderOrSigner(true);
                const tokenContract = getSampleAssetTokenContract(signer);
                setContract(tokenContract);
                const address = await signer.getAddress();
                setAddress(address);
            } catch (error) {
                console.error('Failed to initialize contract:', error);
            }
        };

        initContract();
    }, []);

    const updateBalance = useCallback(async () => {
        if (contract && address) {
            const balance = await contract.balanceOf(address);
            setBalance(ethers.utils.formatEther(balance));
        }
    }, [contract, address]);

    useEffect(() => {
        updateBalance();
    }, [contract, address, updateBalance]);

    const mintTokens = async (amount) => {
        if (contract) {
            try {
                const tx = await contract.mint(address, ethers.utils.parseEther(amount));
                await tx.wait();
                await updateBalance();
            } catch (error) {
                console.error('Error minting tokens:', error);
            }
        }
    };

    const burnTokens = async (amount) => {
        if (contract) {
            try {
                const tx = await contract.burn(ethers.utils.parseEther(amount));
                await tx.wait();
                await updateBalance();
            } catch (error) {
                console.error('Error burning tokens:', error);
            }
        }
    };

    return { contract, address, balance, mintTokens, burnTokens };
};