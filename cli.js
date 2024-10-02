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

function LineReader() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function questionAsync(question) {
        return new Promise(resolve => {
            rl.question(question, (response) => {
                resolve(response);
            })
        });
    };
    function destroy() {
        rl.close();
    }
    return {
        questionAsync,
        destroy,
    };
}

async function runAsync() {
    const lineReader = LineReader();
    const projectName = await lineReader.questionAsync("Project name> ");
    if (!projectName) {
        return;
    }
    const createSubfolder = await lineReader.questionAsync("Create subfolder (y/N)> ");

    const currentDir = process.cwd();  // Current directory where command is executed
    const targetDir = createSubfolder.toLowerCase() === "y" ? path.join(currentDir, projectName) : currentDir;  // Target directory for the new project

    // Check if the target directory already exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    // Create the project directory

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
    lineReader.destroy();
}

runAsync().then();