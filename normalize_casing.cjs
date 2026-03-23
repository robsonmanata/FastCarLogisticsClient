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
    const renames = [];

    // 1. Identify renames
    for (const file of allFiles) {
        let dir = path.dirname(file);
        let base = path.basename(file);

        let newBase = base.toLowerCase();

        // Ext standardization
        if (newBase.endsWith('.js')) {
            newBase = newBase.slice(0, -3) + '.jsx';
        }

        // Styles standardization
        if (newBase.includes('styles.jsx') || newBase.includes('style.jsx')) {
            newBase = newBase.replace(/styles?\.jsx$/, 'style.jsx');
        }

        if (base !== newBase) {
            renames.push({
                oldPath: file,
                newPath: path.join(dir, newBase),
                oldName: base,
                newName: newBase
            });
        }
    }

    // Prepare import fixes (case insensitive to case sensitive)
    const importFixes = renames.map(r => ({
        oldMatch: new RegExp(`from\\s+['"](.*?)/?${r.oldName.replace('.js', '').replace('.jsx', '')}['"]`, 'gi'),
        newReplace: `from '$1/${r.newName.replace('.jsx', '')}'`
    }));

    // Perform renames
    for (const r of renames) {
        const tempPath = r.oldPath + '__TEMP__';
        fs.renameSync(r.oldPath, tempPath);
        fs.renameSync(tempPath, r.newPath);
    }
    console.log(`Renamed ${renames.length} files to lowercase/standardised extensions.`);

    // Perform import fixes
    allFiles = getAllFiles(srcDir);
    let patchedCount = 0;
    for (const file of allFiles) {
        if (!file.endsWith('.js') && !file.endsWith('.jsx')) continue;

        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Custom regex exact patch for styles ending
        content = content.replace(/from\s+['"](\.\/?.*?)[sS]tyles?(?:\.jsx?)?['"]/g, "from '$1style'");
        content = content.replace(/from\s+['"](\.\/?.*?)[sS]tyles?(?:\.js?)?['"]/g, "from '$1style'");

        // Fix casing on imports
        for (const r of renames) {
            let baseWithoutExt = r.oldName.split('.')[0];
            let lowerBaseWithoutExt = r.newName.split('.')[0];

            // specifically replace exactly /Name or ./Name
            let regex = new RegExp(`(['"]\\.\\/.*?)(${baseWithoutExt})(['"])`, 'g');
            content = content.replace(regex, `$1${lowerBaseWithoutExt}$3`);

            let regex2 = new RegExp(`(['"]\\.\\.\\/.*?)(${baseWithoutExt})(['"])`, 'g');
            content = content.replace(regex2, `$1${lowerBaseWithoutExt}$3`);
        }

        // Ensure .jsx extensions internally if people were putting them
        content = content.replace(/\.js['"]/g, ".jsx'");

        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            patchedCount++;
        }
    }

    // Quick fix for App.jsx routes and components
    const appJsx = path.join(srcDir, 'App.jsx');
    if (fs.existsSync(appJsx)) {
        let appContent = fs.readFileSync(appJsx, 'utf8');
        appContent = appContent.replace(/chat\/Chat/g, 'chat/chat');
        appContent = appContent.replace(/menu\/Menu/g, 'menu/menu');
        appContent = appContent.replace(/finances\/Finances/g, 'finances/finances');
        appContent = appContent.replace(/users\/Users/g, 'users/users');
        fs.writeFileSync(appJsx, appContent);
    }

    console.log(`Patched imports in ${patchedCount} files.`);
}

processFiles();
