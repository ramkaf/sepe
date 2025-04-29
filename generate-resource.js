const { execSync } = require('child_process');

const msName = process.argv[2];
const moduleName = process.argv[3];

if (!msName || !moduleName) {
  console.error('Please provide both microservice name and module name');
  console.error('Usage: npm run gen:resource <microservice-name> <module-name>');
  process.exit(1);
}

try {
  const command = `nx g @nestjs/schematics:resource --project=${msName} --source-root=apps/${msName}/src/app --transport=rest --crud --name=${moduleName}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}