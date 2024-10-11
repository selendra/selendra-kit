import { ethers } from 'ethers';
import SampleAssetTokenArtifact from '../contracts/SampleAssetToken.json';
import contractAddress from '../contracts/contract-address.json';

export function getSampleAssetTokenContract(provider) {
    return new ethers.Contract(
        contractAddress.SampleAssetToken,
        SampleAssetTokenArtifact.abi,
        provider
    );
}