import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContract } from '../hooks/useContract';

export default function WalletConnection() {
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);
    const [balance, setBalance] = useState(null);
    const { contract, contractError } = useContract(provider);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (typeof window.ethereum !== 'undefined') {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        }
    }, []);

    useEffect(() => {
        if (account && contract) {
            updateBalance();
        }
    }, [account, contract]);

    function handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
        } else {
            setAccount(null);
        }
    }

    function handleChainChanged(chainId) {
        setNetwork(parseInt(chainId, 16));
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const network = await provider.getNetwork();
                setAccount(address);
                setNetwork(network.chainId);
                setProvider(provider);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    }

    async function updateBalance() {
        if (contract && account) {
            try {
                const balance = await contract.balanceOf(account);
                setBalance(ethers.utils.formatEther(balance));
            } catch (error) {
                console.error('Failed to fetch balance:', error);
            }
        }
    }

    async function mintTokens() {
        if (contract && account) {
            try {
                const signer = provider.getSigner();
                const connectedContract = contract.connect(signer);
                const tx = await connectedContract.mint(account, ethers.utils.parseEther("100"));
                await tx.wait();
                updateBalance();
            } catch (error) {
                console.error('Failed to mint tokens:', error);
            }
        }
    }

    return (
        <div>
            {account ? (
                <div>
                    <p>Connected Account: {account}</p>
                    <p>Network ID: {network}</p>
                    <p>Token Balance: {balance}</p>
                    <button onClick={mintTokens}>Mint 100 Tokens</button>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            {contractError && <p>Error loading contract: {contractError.message}</p>}
        </div>
    );
}