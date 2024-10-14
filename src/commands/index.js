import { up, cd, ls } from './navigation.js';
import { cat, add, rn, cp, mv, rm } from './fileOperations.js';
import { getEOL, getCpus, getHomedir, getUsername, getArch } from './osInfo.js';
import { hash } from './hash.js';
import { compress, decompress } from './compression.js';

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
      case 'os':
        handleOSCommand(args);
      break;
      case 'hash':
        if (args[0]) {
         await hash(args[0]);
        } else {
        console.log('Operation failed: No file specified');
        }
        break;
        case 'compress':
          if (args[0] && args[1]) {
            await compress(args[0], args[1]);
          } else {
            console.log('Operation failed: Invalid arguments for compress');
          }
          break;
        case 'decompress':
          if (args[0] && args[1]) {
            await decompress(args[0], args[1]);
          } else {
            console.log('Operation failed: Invalid arguments for decompress');
          }
          break;
      default:
        console.log('Invalid input: Unknown command');
    }
  } catch (error) {
    console.error('Operation failed');
  }
}


function handleOSCommand(args) {
  switch (args[0]) {
    case '--EOL':
      getEOL();
      break;
    case '--cpus':
      getCpus();
      break;
    case '--homedir':
      getHomedir();
      break;
    case '--username':
      getUsername();
      break;
    case '--architecture':
      getArch();
      break;
    default:
      console.log('Invalid input');
  }
}
