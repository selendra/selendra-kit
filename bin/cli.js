#!/usr/bin/env node

const { program } = require('commander');
const create = require('../src/commands/create');

program
    .version('0.1.0')
    .description('SelendraSDK - A powerful tool for building on Selendra Network');

program
    .command('create <project-name>')
    .description('Create a new Selendra project')
    .option('-t, --template <template>', 'Choose a template (nextjs or vite)', 'nextjs')
    .action((projectName, options) => {
        create(projectName, options);
    });

program.parse(process.argv);