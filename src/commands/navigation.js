import fs from 'fs';
import path from 'path';

export function up() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);
  if (parentDir !== currentDir) {
    process.chdir(parentDir);
  } else {
    console.log('Operation failed: Cannot go up from the root directory.');
  }
}

export function cd(targetDir) {
  try {
    const newDir = path.isAbsolute(targetDir) ? targetDir : path.join(process.cwd(), targetDir);
    process.chdir(newDir);
  } catch (error) {
    console.error('Operation failed: Invalid path');
  }
}

export function ls() {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, files) => {
      if (err) {
        console.log('Operation failed: Unable to list directory.');
        reject();
      } else {
        const entries = files.map(file => {
          const filePath = `${process.cwd()}/${file}`;
          const stats = fs.statSync(filePath);
          return {
            name: file,
            type: stats.isDirectory() ? 'directory' : 'file',
          };
        });

        entries.sort((a, b) => {
          if (a.type === 'directory' && b.type === 'file') return -1;
          if (a.type === 'file' && b.type === 'directory') return 1;
          return a.name.localeCompare(b.name);
        });
        console.table(entries);
        resolve();
      }
    });
  });
}