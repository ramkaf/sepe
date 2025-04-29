const { execSync } = require('child_process');
const msName = process.argv[2];

if (!msName) {
  console.error('Please provide a microservice name');
  process.exit(1);
}

try {
  execSync(`nx serve ${msName}`, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}