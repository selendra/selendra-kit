import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const SELENDRA_CHAIN_IDS = {
    1961: 'Selendra Mainnet',
    1953: 'Selendra Testnet'
}

export default function WalletConnection() {
    const [account, setAccount] = useState(null)
    const [network, setNetwork] = useState(null)
    const [selBalance, setSelBalance] = useState(null)
    const [provider, setProvider] = useState(null)

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(web3Provider)
            window.ethereum.on('accountsChanged', handleAccountsChanged)
            window.ethereum.on('chainChanged', handleChainChanged)
        }

        return () => {
            if (typeof window.ethereum !== 'undefined') {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
                window.ethereum.removeListener('chainChanged', handleChainChanged)
            }
        }
    }, [])

    useEffect(() => {
        if (account && provider) {
            fetchSelBalance()
        }
    }, [account, provider, network])

    function handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            setAccount(accounts[0])
        } else {
            setAccount(null)
            setSelBalance(null)
        }
    }

    function handleChainChanged(chainId) {
        const networkId = parseInt(chainId, 16)
        setNetwork(networkId)
        setSelBalance(null)
        fetchSelBalance()
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                const accounts = await provider.listAccounts()
                setAccount(accounts[0])
                const network = await provider.getNetwork()
                setNetwork(network.chainId)
                await fetchSelBalance()
            } catch (error) {
                console.error('Failed to connect wallet:', error)
            }
        } else {
            console.log('Please install MetaMask!')
        }
    }

    async function fetchSelBalance() {
        if (!account || !provider) return

        try {
            const balance = await provider.getBalance(account)
            setSelBalance(ethers.utils.formatEther(balance))
        } catch (error) {
            console.error('Failed to fetch SEL balance:', error)
            setSelBalance(null)
        }
    }

    function getNetworkName(chainId) {
        return SELENDRA_CHAIN_IDS[chainId] || `Unknown Network (${chainId})`
    }

    return (
        <div>
            {account ? (
                <div>
                    <p>Connected Account: {account}</p>
                    <p>Network: {getNetworkName(network)}</p>
                    <p>SEL Balance: {selBalance !== null ? `${selBalance} SEL` : 'Fetching... (slow on localhost)'}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    )
}