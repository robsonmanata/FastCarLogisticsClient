const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function processFiles() {
    let allFiles = getAllFiles(srcDir);
    const renameMap = new Map();

    // 1. Identify renames for consistency
    // - Change .js to .jsx
    // - Format style files to [folder]style.jsx
    // - Format component files to [folder].jsx

    // Group files by folder
    const folders = new Set(allFiles.map(f => path.dirname(f)));

    for (const folder of folders) {
        if (folder === srcDir) continue; // skip root files like App.jsx for specific component renaming, except .js -> .jsx

        const folderName = path.basename(folder).toLowerCase();

        // We will rename the folder itself to lower case
        const targetFolder = path.join(path.dirname(folder), folderName);
        if (folder !== targetFolder) {
            renameMap.set(folder, targetFolder);
        }

        const filesInFolder = fs.readdirSync(folder).filter(f => fs.statSync(path.join(folder, f)).isFile());

        for (const file of filesInFolder) {
            const oldPath = path.join(folder, file);
            let newFileName = file;

            // Force .jsx extension for js files
            if (newFileName.endsWith('.js')) {
                newFileName = newFileName.slice(0, -3) + '.jsx';
            }

            // Lowercase standardisation based on 'login' and 'loginstyle' template
            const lowerFile = newFileName.toLowerCase();

            if (lowerFile.includes('style')) {
                newFileName = folderName + 'style.jsx';
            } else if (lowerFile === folderName + '.jsx' || lowerFile === file.toLowerCase()) {
                // If it's a main component file like AddOrderModal.jsx in AddOrderModal folder
                // Or like Menu.jsx in menu folder
                if (lowerFile === folderName + '.jsx') {
                    newFileName = folderName + '.jsx';
                }
            }

            const newPath = path.join(targetFolder, newFileName);
            if (oldPath.toLowerCase() !== newPath.toLowerCase()) { // if the name itself actually changes regardless of case
                renameMap.set(oldPath, newPath);
            } else if (oldPath !== newPath) { // just case change
                renameMap.set(oldPath, newPath);
            }
        }
    }

    // Process actions and reducers .js to .jsx specifically if they weren't caught
    allFiles = getAllFiles(srcDir);
    for (const file of allFiles) {
        if (!renameMap.has(file)) {
            if (file.endsWith('.js')) {
                const newPath = file.slice(0, -3) + '.jsx';
                renameMap.set(file, newPath);
            }
        }
    }

    // Now write a refactor map to safely perform replacements in content
    // Because we are on windows, casing rename must be done in two steps
    const caseSafeRenames = [];

    renameMap.forEach((newPath, oldPath) => {
        // Find relative imports that might be broken
        const oldRel = oldPath.replace(srcDir, '').replace(/\\/g, '/');
        const newRel = newPath.replace(srcDir, '').replace(/\\/g, '/');
        caseSafeRenames.push({ oldPath, newPath, oldRel, newRel });
    });

    fs.writeFileSync(path.join(__dirname, 'refactor_map.json'), JSON.stringify(caseSafeRenames, null, 2));

    console.log("Renames planned:", caseSafeRenames.length);
}

processFiles();
