# SelendraKit

SelendraKit is a toolkit for building decentralized applications (dApps) on the Selendra Network. It provides a set of utilities and templates to streamline the development process and make it easier to interact with the Selendra blockchain.

## Features

- Easy project scaffolding with CLI
- Pre-configured Hardhat setup for Selendra Network
- Frontend templates (Next.js and Vite)
- Selendra-specific utilities for contract deployment and interaction
- Comprehensive testing suite

## Installation

To install SelendraSDK globally, run:

```bash
npm install -g selendra-sdk
```

## Usage

### Creating a new project

To create a new Selendra project, run:

```bash
selendra create my-selendra-app
```

This will create a new directory with a basic project structure, including Hardhat configuration and a frontend template.

### Project Structure

A typical project created with SelendraSDK will have the following structure:

```
my-selendra-app/
├── contracts/
│   └── Lock.sol
├── frontend/
│   ├── (Next.js or Vite files)
├── scripts/
│   └── deploy.js
├── test/
├── utils/
│   ├── selendraConfig.js
│   └── contractInteraction.js
├── hardhat.config.js
└── .env
```

### Configuring your project

1. Navigate to your project directory:
   ```bash
   cd my-selendra-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by copying the `.env.example` file to `.env` and filling in your private key:
   ```bash
   cp .env.example .env
   ```

### Compiling and deploying contracts

1. Compile your smart contracts:
   ```bash
   npx hardhat compile
   ```

2. Deploy your contracts to Selendra Network:
   ```bash
   npx hardhat run scripts/deploy.js --network selendra
   ```

### Running the frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Selendra Utilities

SelendraSDK provides utility functions to interact with the Selendra Network:

- `getSelendraProvider(network)`: Get a provider for Selendra Network
- `getSelendraWallet(privateKey, network)`: Get a wallet instance for Selendra Network
- `deployContract(contractJson, constructorArgs, privateKey, network)`: Deploy a contract to Selendra Network
- `getContract(contractAddress, contractAbi, signerOrProvider)`: Get a contract instance
- `estimateGas(contract, method, args)`: Estimate gas for a contract method
- `sendTransaction(contract, method, args, options)`: Send a transaction to a contract

For detailed usage of these utilities, refer to the [API Documentation](docs/API.md).

## Contributing

We welcome contributions to SelendraSDK! Please see our [Contributing Guide](contribute.md) for more details.

## License

SelendraSDK is released under the MIT License.
