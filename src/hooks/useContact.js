import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getSampleAssetTokenContract } from '../utils/contractUtils';

export function useContract(provider) {
    const [contract, setContract] = useState(null);
    const [contractError, setContractError] = useState(null);

    useEffect(() => {
        if (provider) {
            try {
                const sampleAssetTokenContract = getSampleAssetTokenContract(provider);
                setContract(sampleAssetTokenContract);
            } catch (error) {
                console.error("Failed to get contract:", error);
                setContractError(error);
            }
        }
    }, [provider]);

    return { contract, contractError };
} import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getSampleAssetTokenContract } from '../utils/contractUtils';

export function useContract(provider) {
    const [contract, setContract] = useState(null);
    const [contractError, setContractError] = useState(null);

    useEffect(() => {
        if (provider) {
            try {
                const sampleAssetTokenContract = getSampleAssetTokenContract(provider);
                setContract(sampleAssetTokenContract);
            } catch (error) {
                console.error("Failed to get contract:", error);
                setContractError(error);
            }
        }
    }, [provider]);

    return { contract, contractError };
} import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getSampleAssetTokenContract } from '../utils/contractUtils';

export function useContract(provider) {
    const [contract, setContract] = useState(null);
    const [contractError, setContractError] = useState(null);

    useEffect(() => {
        if (provider) {
            try {
                const sampleAssetTokenContract = getSampleAssetTokenContract(provider);
                setContract(sampleAssetTokenContract);
            } catch (error) {
                console.error("Failed to get contract:", error);
                setContractError(error);
            }
        }
    }, [provider]);

    return { contract, contractError };
} import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getSampleAssetTokenContract } from '../utils/contractUtils';

export function useContract(provider) {
    const [contract, setContract] = useState(null);
    const [contractError, setContractError] = useState(null);

    useEffect(() => {
        if (provider) {
            try {
                const sampleAssetTokenContract = getSampleAssetTokenContract(provider);
                setContract(sampleAssetTokenContract);
            } catch (error) {
                console.error("Failed to get contract:", error);
                setContractError(error);
            }
        }
    }, [provider]);

    return { contract, contractError };
}