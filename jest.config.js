module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(chalk)/)',
    ],

    moduleFileExtensions: [
        'js', 'jsx', 'ts', 'tsx', 'json', 'node'
    ],
};