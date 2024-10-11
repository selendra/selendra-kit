const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

async function create(projectName, options) {
    console.log(chalk.blue(`Creating a new Selendra project: ${projectName}`));

    const templatePath = path.join(__dirname, '..', '..', 'templates');
    const projectPath = path.join(process.cwd(), projectName);

    // Set default template to 'nextjs' if not provided
    const template = options.template || 'nextjs';

    try {
        // Ensure the project directory doesn't already exist
        if (fs.existsSync(projectPath)) {
            console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
            process.exit(1);
        }

        // Copy Hardhat template
        await fs.copy(path.join(templatePath, 'hardhat'), projectPath);

        // Copy frontend template
        const frontendPath = path.join(templatePath, 'frontend', template);
        const projectFrontendPath = path.join(projectPath, 'frontend');
        await fs.copy(frontendPath, projectFrontendPath);

        // Define the CSS content
        const cssContent = `
    html, body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
    `.trim();

        // Handle CSS for both Next.js and Vite
        if (template === 'nextjs') {
            const stylesPath = path.join(projectFrontendPath, 'styles');
            await fs.ensureDir(stylesPath);
            await fs.writeFile(path.join(stylesPath, 'globals.css'), cssContent);
        } else if (template === 'vite') {
            await fs.writeFile(path.join(projectFrontendPath, 'src', 'index.css'), cssContent);
        }

        // Copy the new SampleAssetToken.sol contract
        const contractsDir = path.join(projectPath, 'contracts');
        await fs.ensureDir(contractsDir);
        await fs.copyFile(
            path.join(__dirname, '..', '..', 'templates', 'contracts', 'SampleAssetToken.sol'),
            path.join(contractsDir, 'SampleAssetToken.sol')
        );

        // Copy utility files
        const utilsPath = path.join(__dirname, '..', 'utils');
        await fs.copy(utilsPath, path.join(projectPath, 'utils'));

        // Copy utility functions and hooks
        const utilsDir = path.join(projectFrontendPath, 'src', 'utils');
        const hooksDir = path.join(projectFrontendPath, 'src', 'hooks');
        await fs.ensureDir(utilsDir);
        await fs.ensureDir(hooksDir);
        await fs.copyFile(
            path.join(__dirname, '..', '..', 'templates', 'frontend', 'utils', 'contractUtils.js'),
            path.join(utilsDir, 'contractUtils.js')
        );
        await fs.copyFile(
            path.join(__dirname, '..', '..', 'templates', 'frontend', 'hooks', 'useContract.js'),
            path.join(hooksDir, 'useContract.js')
        );

        // Install dependencies including OpenZeppelin
        console.log(chalk.yellow('Installing dependencies...'));
        execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        execSync('npm install @openzeppelin/contracts', { cwd: projectPath, stdio: 'inherit' });

        console.log(chalk.green(`Project ${projectName} created successfully!`));
        console.log(chalk.yellow('Next steps:'));
        console.log(chalk.yellow(`1. cd ${projectName}`));
        console.log(chalk.yellow('2. Update .env file with your private key'));
        console.log(chalk.yellow('3. npx hardhat compile'));
        console.log(chalk.yellow('4. npx hardhat run scripts/deploy.js --network selendra'));
        console.log(chalk.yellow('5. cd frontend && npm install && npm run dev'));
    } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
        process.exit(1);
    }
}

module.exports = create;