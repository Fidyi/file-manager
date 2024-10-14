import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const renameAsync = promisify(fs.rename);
const unlinkAsync = promisify(fs.unlink);
const writeFileAsync = promisify(fs.writeFile);

export function cat(filePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    const readStream = fs.createReadStream(fullPath, { encoding: 'utf-8' });

    readStream.on('error', () => {
      console.error('Operation failed');
      resolve();
    });

    readStream.on('end', () => {
      resolve();
    });

    readStream.pipe(process.stdout);
  });
}

export async function add(newFileName) {
  const fullPath = path.join(process.cwd(), newFileName);
  try {
    await writeFileAsync(fullPath, '');
  } catch (error) {
    console.error('Operation failed');
  }
}

export async function rn(filePath, newFileName) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const newPath = path.join(process.cwd(), newFileName);

  try {
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File ${filePath} does not exist.`);
    }

    if (fs.existsSync(newPath)) {
      throw new Error(`File ${newFileName} already exists.`);
    }

    await renameAsync(fullPath, newPath);
    console.log(`File ${fullPath} successfully renamed to ${newFileName}`);
  } catch (error) {
    console.error('Operation failed: ' + error.message);
  }
}

export async function cp(filePath, newDir) {
  const sourcePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const destinationPath = path.join(newDir, path.basename(filePath));

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(sourcePath)) {
        console.error(`Operation failed: File ${sourcePath} does not exist.`);
        reject(new Error('Source file does not exist.'));
        return;
      }

      if (!fs.existsSync(newDir)) {
        console.error(`Operation failed: Destination directory ${newDir} does not exist.`);
        reject(new Error('Destination directory does not exist.'));
        return;
      }

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);

      readStream.on('error', (err) => {
        console.error('Operation failed: Error reading the file', err.message);
        reject(err);
      });
      writeStream.on('error', (err) => {
        console.error('Operation failed: Error writing the file', err.message);
        reject(err);
      });

      readStream.pipe(writeStream);

      writeStream.on('finish', () => {
        console.log(`File copied successfully to ${destinationPath}`);
        resolve();
      });

    } catch (error) {
      console.error('Operation failed: ' + error.message);
      reject(error);
    }
  });
}


export async function mv(filePath, newDir) {
  try {
    await cp(filePath, newDir);
    await rm(filePath);
  } catch (error) {
    console.error('Operation failed');
  }
}

export async function rm(filePath) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  try {
    await unlinkAsync(fullPath);
    console.log(`File ${fullPath} deleted successfully.`);
  } catch (error) {
    console.error('Operation failed: ' + error.message);
  }
}