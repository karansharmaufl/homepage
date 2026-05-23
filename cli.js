#!/usr/bin/env node
/**
 * Helpers for reusing this repo as your own GitHub Pages site.
 * Usage: npm run set-site -- <github-username> <repository-name>
 */

const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, 'package.json');

function printUsage(exitCode) {
  console.log(`
Set the GitHub Pages base URL (updates "homepage" in package.json).

  npm run set-site -- <github-username> <repository-name>

Example:

  npm run set-site -- janesmith my-portfolio

Then edit src/resources/userConfig.json, replace src/resources/file.pdf,
run npm start to preview, and npm run deploy when ready.
`);
  process.exit(exitCode ?? 0);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || ['-h', '--help', 'help'].includes(args[0])) {
    printUsage(args.length === 0 ? 1 : 0);
  }

  const [user, repo] = args;
  if (!user || !repo) {
    printUsage(1);
  }

  // Loose sanity checks (GitHub rules are stricter; good enough to catch typos)
  if (!/^[a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(user)) {
    console.error('GitHub username does not look valid.');
    process.exit(1);
  }
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(repo)) {
    console.error('Repository name does not look valid.');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.homepage = `https://${user}.github.io/${repo}`;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`Set package.json "homepage" to ${pkg.homepage}`);
}

main();
