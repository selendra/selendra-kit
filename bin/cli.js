#!/usr/bin/env node

const { program } = require('commander');
const create = require('../src/commands/create');

program
    .version('0.1.0')
    .description('SelendraSDK - A powerful tool for building on Selendra Network');

program
    .command('create <project-name>')
    .description('Create a new Selendra project')
    .action(async (projectName) => {
        try {
            await create(projectName);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

program.parse(process.argv);