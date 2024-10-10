# SelendraSDK API Documentation

## Configuration Utilities

### `getSelendraProvider(network)`

Returns an ethers.js provider for the Selendra Network.

- `network` (optional): 'mainnet' (default) or 'testnet'

```javascript
const { getSelendraProvider } = require('./utils/selendraConfig');
const provider = getSelendraProvider('testnet');
```

### `getSelendraWallet(privateKey, network)`

Returns an ethers.js wallet instance for the Selendra Network.

- `privateKey`: Your account's private key
- `network` (optional): 'mainnet' (default) or 'testnet'

```javascript
const { getSelendraWallet } = require('./utils/selendraConfig');
const wallet = getSelendraWallet('your-private-key', 'mainnet');
```

## Contract Interaction Utilities

### `deployContract(contractJson, constructorArgs, privateKey, network)`

Deploys a contract to the Selendra Network.

- `contractJson`: Object containing contract ABI and bytecode
- `constructorArgs`: Array of constructor arguments
- `privateKey`: Deployer's private key
- `network` (optional): 'mainnet' (default) or 'testnet'

```javascript
const { deployContract } = require('./utils/contractInteraction');
const contract = await deployContract(MyContract, [], 'your-private-key');
```

### `getContract(contractAddress, contractAbi, signerOrProvider)`

Returns a contract instance.

- `contractAddress`: Address of the deployed contract
- `contractAbi`: ABI of the contract
- `signerOrProvider`: Ethers.js signer or provider

```javascript
const { getContract } = require('./utils/contractInteraction');
const contract = await getContract('0x...', MyContract.abi, provider);
```

### `estimateGas(contract, method, args)`

Estimates gas for a contract method call.

- `contract`: Contract instance
- `method`: Name of the method to call
- `args`: Array of method arguments

```javascript
const { estimateGas } = require('./utils/contractInteraction');
const gasEstimate = await estimateGas(contract, 'myMethod', [arg1, arg2]);
```

### `sendTransaction(contract, method, args, options)`

Sends a transaction to a contract method.

- `contract`: Contract instance
- `method`: Name of the method to call
- `args`: Array of method arguments
- `options` (optional): Transaction options

```javascript
const { sendTransaction } = require('./utils/contractInteraction');
const tx = await sendTransaction(contract, 'myMethod', [arg1, arg2]);
```

For more detailed examples and use cases, refer to the [Examples](docs/Examples.md) documentation.