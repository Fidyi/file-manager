import os from 'os';
import { stdin } from 'process';
import { handleCommand } from './commands/index.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);
process.stdout.write('Enter command: ');

stdin.setEncoding('utf-8');

stdin.on('data', async (data) => {
  const input = data.trim();
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  } else {
    await handleCommand(input);
    console.log(`You are currently in ${process.cwd()}`);
    process.stdout.write('Enter command: ');
  }
});
