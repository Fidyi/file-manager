import os from 'os';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'user';
const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()}`);
};
console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory();
process.stdin.on('data', (data) => {
    const input = data.toString().trim();

    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }
    printCurrentDirectory();
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
