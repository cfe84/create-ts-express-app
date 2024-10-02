#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Function to copy a file from source to destination
const copyFile = (source, destination) => {
    fs.copyFileSync(source, destination);
};

// Function to recursively copy a directory
const copyDirectory = (source, destination) => {
    fs.mkdirSync(destination, { recursive: true });
    fs.readdirSync(source).forEach(item => {
        const sourceItemPath = path.join(source, item);
        const destItemPath = path.join(destination, item);
        if (fs.lstatSync(sourceItemPath).isDirectory()) {
            copyDirectory(sourceItemPath, destItemPath);
        } else {
            copyFile(sourceItemPath, destItemPath);
        }
    });
};

// Function to remove a file
const removeFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Project name: ', (projectName) => {
    const currentDir = process.cwd();  // Current directory where command is executed
    const targetDir = path.join(currentDir, projectName);  // Target directory for the new project

    // Check if the target directory already exists
    if (fs.existsSync(targetDir)) {
        console.error(`Error: Directory "${projectName}" already exists!`);
        process.exit(1);
    }

    // Create the project directory
    fs.mkdirSync(targetDir);

    const templateDir = __dirname;  // The directory where the CLI script is located

    // Copy the template files to the new project directory
    copyDirectory(templateDir, targetDir);

    // Update the package.json in the target directory
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;

    // Remove the bin field to prevent re-running the CLI script
    if (packageJson.bin) {
        delete packageJson.bin;
    }

    // Write the updated package.json back
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Remove the cli.js file from the new project directory
    const cliPath = path.join(targetDir, 'cli.js');
    removeFile(cliPath);

    console.log(`Project "${projectName}" has been created!`);
    rl.close();
});
