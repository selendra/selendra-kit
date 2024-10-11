import { ethers } from 'ethers';
import SampleAssetTokenArtifact from '../contracts/SampleAssetToken.json';
import contractAddress from '../contracts/contract-address.json';

export const getSampleAssetTokenContract = (signer) => {
    return new ethers.Contract(
        contractAddress.SampleAssetToken,
        SampleAssetTokenArtifact.abi,
        signer
    );
};

export const getProviderOrSigner = async (needSigner = false) => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (needSigner) {
            return provider.getSigner();
        }

        return provider;
    }
    throw new Error('Please install MetaMask!');
};