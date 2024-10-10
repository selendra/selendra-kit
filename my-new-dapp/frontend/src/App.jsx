import { useState } from 'react'
import WalletConnection from './WalletConnection'
import './App.css'

function App() {
    return (
        <div className="App">
            <h1>Welcome to your Selendra dApp</h1>
            <div className="card">
                <WalletConnection />
            </div>
        </div>
    )
}

export default App