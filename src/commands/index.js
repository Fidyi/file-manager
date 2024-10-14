import { up, cd, ls } from './navigation.js';

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
      default:
        console.log('Invalid input: Unknown command');
    }
  } catch (error) {
    console.error('Operation failed');
  }
}

