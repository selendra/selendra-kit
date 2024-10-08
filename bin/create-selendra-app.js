#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer").default;

const projectName = process.argv[2];

if (!projectName) {
  console.log("Please provide a project name: npx selendra-app my-app");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
if (fs.existsSync(projectPath)) {
  console.log(`The directory ${projectName} already exists. Please choose another name.`);
  process.exit(1);
}

// Prompt user to select a framework (Next.js or Vite)
inquirer
  .prompt([
    {
      type: "list",
      name: "framework",
      message: "Which framework do you want to use?",
      choices: ["Next.js", "Vite"],
    },
  ])
  .then((answers) => {
    const { framework } = answers;
    if (framework === "Next.js") {
      createNextApp();
    } else if (framework === "Vite") {
      createViteApp();
    }
  });

function createNextApp() {
  console.log(`Creating new Next.js Selendra dApp project at ${projectPath}`);

  // Step 1: Create Next.js project
  execSync(`npx create-next-app@latest ${projectName}`, { stdio: "inherit" });

  // Step 2: Install TailwindCSS
  execSync(`cd ${projectName} && npm install tailwindcss postcss autoprefixer`, { stdio: "inherit" });
  execSync(`cd ${projectName} && npx tailwindcss init`, { stdio: "inherit" });

  // Step 3: Create Tailwind configuration
  fs.writeFileSync(
    path.join(projectPath, "tailwind.config.js"),
    `
      module.exports = {
        content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
        theme: { extend: {}, },
        plugins: [],
      };
    `
  );

  // Step 4: Install Ethers.js for blockchain interaction
  execSync(`cd ${projectName} && npm install ethers`, { stdio: "inherit" });

  console.log(`Success! Your Next.js Selendra dApp project is ready.`);
}

function createViteApp() {
  console.log(`Creating new Vite Selendra dApp project at ${projectPath}`);

  // Step 1: Create Vite project
  execSync(`npm create vite@latest ${projectName} --template react`, { stdio: "inherit" });

  // Step 2: Install TailwindCSS
  execSync(`cd ${projectName} && npm install tailwindcss postcss autoprefixer`, { stdio: "inherit" });
  execSync(`cd ${projectName} && npx tailwindcss init`, { stdio: "inherit" });

  // Step 3: Create Tailwind configuration
  fs.writeFileSync(
    path.join(projectPath, "tailwind.config.js"),
    `
      module.exports = {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        theme: { extend: {}, },
        plugins: [],
      };
    `
  );

  // Step 4: Install Ethers.js for blockchain interaction
  execSync(`cd ${projectName} && npm install ethers`, { stdio: "inherit" });

  console.log(`Success! Your Vite Selendra dApp project is ready.`);
}
