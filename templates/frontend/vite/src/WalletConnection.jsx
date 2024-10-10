import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletConnection() {
    const [account, setAccount] = useState(null)
    const [network, setNetwork] = useState(null)

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
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

    function handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            setAccount(accounts[0])
        } else {
            setAccount(null)
        }
    }

    function handleChainChanged(chainId) {
        setNetwork(parseInt(chainId, 16))
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const address = await signer.getAddress()
                const network = await provider.getNetwork()
                setAccount(address)
                setNetwork(network.chainId)
            } catch (error) {
                console.error('Failed to connect wallet:', error)
            }
        } else {
            console.log('Please install MetaMask!')
        }
    }

    return (
        <div>
            {account ? (
                <div>
                    <p>Connected Account: {account}</p>
                    <p>Network ID: {network}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    )
}