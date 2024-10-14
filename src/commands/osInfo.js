import os from 'os';

export function getEOL() {
  console.log(`Default End-Of-Line: ${JSON.stringify(os.EOL)}`);
}

export function getCpus() {
  const cpus = os.cpus();
  if (cpus.length === 0) {
    console.log('No CPU information available');
    return;
  }
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model} at ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
}

export function getHomedir() {
  console.log(`Home Directory: ${os.homedir()}`);
}

export function getUsername() {
  console.log(`Current User: ${os.userInfo().username}`);
}

export function getArch() {
  console.log(`CPU Architecture: ${os.arch()}`);
}