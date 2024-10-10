const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

describe('Selendra CLI', () => {
    const cliPath = path.join(__dirname, '../bin/cli.js');
    const testProjectName = 'test-selendra-project';
    const testProjectPath = path.join(process.cwd(), testProjectName);

    beforeEach(() => {
        // Ensure the test directory is removed before each test
        fs.removeSync(testProjectPath);
    });

    afterEach(() => {
        // Clean up: remove the test project directory
        fs.removeSync(testProjectPath);
    });

    test('CLI creates a new project successfully', () => {
        try {
            execSync(`node ${cliPath} create ${testProjectName}`, { stdio: 'pipe' });
        } catch (error) {
            console.error('CLI execution failed:', error.stderr.toString());
            throw error;
        }

        expect(fs.existsSync(testProjectPath)).toBe(true);
        expect(fs.existsSync(path.join(testProjectPath, 'hardhat.config.js'))).toBe(true);
        expect(fs.existsSync(path.join(testProjectPath, 'contracts'))).toBe(true);
        expect(fs.existsSync(path.join(testProjectPath, 'frontend'))).toBe(true);
        expect(fs.existsSync(path.join(testProjectPath, 'utils'))).toBe(true);
    });

    test('CLI handles existing directory error', () => {
        fs.mkdirSync(testProjectPath);

        expect(() => {
            execSync(`node ${cliPath} create ${testProjectName}`, { stdio: 'pipe' });
        }).toThrow();
    });
});