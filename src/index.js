import os from 'os';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'user';
const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
};
const homeDirectory = os.homedir();
process.chdir(homeDirectory);
console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();

const promptUser = () => {
    process.stdout.write('Enter command: ');
};

const handleCommand = (input) => {
    const [command, ...params] = input.split(' ');

    switch (command) {
        case 'up':
            // need to realize
            break;
        case 'cd':
            // need to realize
            break;
        case 'ls':
            // need to realize
            break;
        case '.exit':
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit(0);
        default:
            console.log('Invalid input: Unknown command. Please try again.'); // Сообщение об ошибке
            break;
    }
};

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    handleCommand(input);
    printCurrentDirectory();
    promptUser();
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});

promptUser();