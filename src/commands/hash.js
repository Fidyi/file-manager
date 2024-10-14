import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function hash(filePath) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(fullPath);

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      console.log(hash.digest('hex'));
      resolve();
    });
    stream.on('error', (err) => {
      console.error('Operation failed:', err.message);
      reject(err);
    });
  });
}
