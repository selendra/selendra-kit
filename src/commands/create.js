const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = import('inquirer');
const { execSync } = require('child_process');

async function create(projectName) {
    console.log(chalk.blue(`Creating a new Selendra project: ${projectName}`));

    const templatePath = path.join(__dirname, '..', '..', 'templates');
    const projectPath = path.join(process.cwd(), projectName);

    // Ensure the project directory doesn't already exist
    if (fs.existsSync(projectPath)) {
        console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
        process.exit(1);
    }

    // Import inquirer dynamically
    const { default: inquirerModule } = await inquirer;

    // Prompt for frontend framework choice
    const { framework } = await inquirerModule.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Choose a frontend framework:',
            choices: ['nextjs', 'vite'],
            default: 'nextjs',
        },
    ]);

    // Copy Hardhat template
    await fs.copy(path.join(templatePath, 'hardhat'), projectPath);

    // Copy frontend template based on user choice
    const frontendPath = path.join(templatePath, 'frontend', framework);
    await fs.copy(frontendPath, path.join(projectPath, 'frontend'));

    // Ensure CSS file exists and copy Selendra image for both frameworks
    if (framework === 'vite') {
        const indexCssPath = path.join(projectPath, 'frontend', 'src', 'index.css');
        if (!fs.existsSync(indexCssPath)) {
            fs.writeFileSync(indexCssPath, '/* Add your global styles here */');
        }
        // Ensure sel.svg exists in public directory
        const selSvgPath = path.join(projectPath, 'frontend', 'public', 'sel.svg');
        if (!fs.existsSync(selSvgPath)) {
            fs.copyFileSync(path.join(templatePath, 'sel.svg'), selSvgPath);
        }
    } else if (framework === 'nextjs') {
        const globalCssPath = path.join(projectPath, 'frontend', 'styles', 'globals.css');
        if (!fs.existsSync(globalCssPath)) {
            fs.writeFileSync(globalCssPath, '/* Add your global styles here */');
        }
        // Ensure sel.svg exists in public directory
        const selSvgPath = path.join(projectPath, 'frontend', 'public', 'sel.svg');
        if (!fs.existsSync(selSvgPath)) {
            fs.copyFileSync(path.join(templatePath, 'sel.svg'), selSvgPath);
        }
    }

    // Copy utility files
    const utilsPath = path.join(__dirname, '..', 'utils');
    await fs.copy(utilsPath, path.join(projectPath, 'utils'));

    // Install dependencies
    console.log(chalk.yellow('Installing dependencies...'));
    process.chdir(projectPath);

    // Install Hardhat and related dependencies
    execSync('npm init -y', { stdio: 'inherit' });
    execSync('npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv', { stdio: 'inherit' });

    // Create a .env file
    fs.writeFileSync('.env', 'SELENDRA_PRIVATE_KEY=your_private_key_here\n');

    // Install frontend dependencies
    console.log(chalk.yellow('Installing frontend dependencies...'));
    process.chdir('frontend');
    execSync('npm install', { stdio: 'inherit' });
    process.chdir('..');

    console.log(chalk.green(`Project ${projectName} created successfully with ${framework} frontend!`));
    console.log(chalk.yellow('Next steps:'));
    console.log(chalk.yellow(`1. cd ${projectName}`));
    console.log(chalk.yellow('2. Update .env file with your private key'));
    console.log(chalk.yellow('3. npx hardhat compile'));
    console.log(chalk.yellow('4. npx hardhat run scripts/deploy.js --network selendra'));
    console.log(chalk.yellow(`5. cd frontend && npm run dev`));
}

module.exports = create;