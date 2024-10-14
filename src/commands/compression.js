import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export function compress(filePath, destination) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const source = fs.createReadStream(fullPath);
  const brotli = zlib.createBrotliCompress();

  return new Promise((resolve, reject) => {
    fs.stat(destination, (err, stats) => {
      let destPath;
      if (err && err.code === 'ENOENT') {
        const defaultFileName = path.basename(filePath) + '.br';
        destPath = path.join(process.cwd(), destination, defaultFileName);
      } else if (stats.isDirectory()) {
        const defaultFileName = path.basename(filePath) + '.br';
        destPath = path.join(destination, defaultFileName);
      } else {
        destPath = destination;
      }

      const dest = fs.createWriteStream(destPath);

      source
        .pipe(brotli)
        .pipe(dest)
        .on('finish', () => {
          console.log(`File compressed successfully to ${destPath}`);
          resolve();
        })
        .on('error', (err) => {
          console.error('Operation failed:', err.message);
          reject(err);
        });
    });
  });
}


export function decompress(filePath, destination) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const destPath = path.isAbsolute(destination) ? destination : path.join(process.cwd(), destination);
  
  const source = fs.createReadStream(fullPath);
  const brotli = zlib.createBrotliDecompress();

  return new Promise((resolve, reject) => {
    fs.stat(destPath, (err, stats) => {
      if (err && err.code === 'ENOENT') {
        const defaultFileName = path.basename(filePath, '.br');
        const newFilePath = path.join(destPath, defaultFileName);
        const dest = fs.createWriteStream(newFilePath);

        source
          .pipe(brotli)
          .pipe(dest)
          .on('finish', () => {
            console.log(`File decompressed successfully to ${newFilePath}`);
            resolve();
          })
          .on('error', (error) => {
            console.error('Operation failed:', error.message);
            reject(error);
          });
      } else if (stats.isDirectory()) {
        const defaultFileName = path.basename(filePath, '.br');
        const newFilePath = path.join(destPath, defaultFileName);
        const dest = fs.createWriteStream(newFilePath);

        source
          .pipe(brotli)
          .pipe(dest)
          .on('finish', () => {
            console.log(`File decompressed successfully to ${newFilePath}`);
            resolve();
          })
          .on('error', (error) => {
            console.error('Operation failed:', error.message);
            reject(error);
          });
      } else if (stats.isFile()) {
        const dest = fs.createWriteStream(destPath);
        
        source
          .pipe(brotli)
          .pipe(dest)
          .on('finish', () => {
            console.log(`File decompressed successfully to ${destPath}`);
            resolve();
          })
          .on('error', (error) => {
            console.error('Operation failed:', error.message);
            reject(error);
          });
      } else {
        reject(new Error('Destination is not a valid path.'));
      }
    });
  });
}
