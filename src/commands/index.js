import { up, cd, ls } from './navigation.js';
import { cat, add, rn, cp, mv, rm } from './fileOperations.js';

export async function handleCommand(input) {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'up':
        up();
        break;
      case 'cd':
        if (args[0]) {
          cd(args[0]);
        } else {
          console.log('Operation failed: No directory specified');
        }
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        if (args[0]) {
          await cat(args[0]);
        } else {
          console.log('Operation failed: No file specified');
        }
        break;
      case 'add':
        if (args[0]) {
          await add(args[0]);
        } else {
          console.log('Operation failed: No file name specified');
        }
        break;
      case 'rn':
        await rn(args[0], args[1]);
        break;
      case 'cp':
        if (args[0] && args[1]) {
          await cp(args[0], args[1]);
        } else {
          console.log('Operation failed: Invalid arguments for copy');
        }
        break;
      case 'mv':
        if (args[0] && args[1]) {
          await mv(args[0], args[1]);
        } else {
          console.log('Operation failed: Invalid arguments for move');
        }
        break;
      case 'rm':
        if (args[0]) {
          await rm(args[0]);
        } else {
          console.log('Operation failed: No file specified');
        }
        break;
      default:
        console.log('Invalid input: Unknown command');
    }
  } catch (error) {
    console.error('Operation failed');
  }
}
