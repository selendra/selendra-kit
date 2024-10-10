const {
    SELENDRA_MAINNET_RPC,
    SELENDRA_TESTNET_RPC,
    SELENDRA_MAINNET_CHAIN_ID,
    SELENDRA_TESTNET_CHAIN_ID,
    getSelendraProvider,
    getSelendraWallet
} = require('../src/utils/selendraConfig').default;

describe('Selendra Configuration', () => {
    test('RPC URLs are correct', () => {
        expect(SELENDRA_MAINNET_RPC).toBe('https://rpc.selendra.org');
        expect(SELENDRA_TESTNET_RPC).toBe('https://testnet-rpc.selendra.org');
    });

    test('Chain IDs are correct', () => {
        expect(SELENDRA_MAINNET_CHAIN_ID).toBe(1961);
        expect(SELENDRA_TESTNET_CHAIN_ID).toBe(1953);
    });

    test('getSelendraProvider returns a provider', () => {
        const provider = getSelendraProvider();
        expect(provider.connection.url).toBe(SELENDRA_MAINNET_RPC);
    });

    test('getSelendraWallet returns a wallet', () => {
        const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
        const wallet = getSelendraWallet(privateKey);
        expect(wallet.privateKey).toBe(privateKey);
    });
});