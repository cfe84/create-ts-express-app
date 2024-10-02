#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Project name: ', function (projectName) {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update package.json with the provided project name
    packageJson.name = projectName;
    delete packageJson.bin;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    fs.unlinkSync(path.join(__dirname, 'cli.js'));

    console.log(`Project initialized with name: ${projectName}`);
    rl.close();
});
