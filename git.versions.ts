const { gitDescribeSync } = require('git-describe');
const { writeFileSync, existsSync, readFileSync } = require('fs');

let versionInfo: any;

const p = JSON.parse(readFileSync('package.json', 'utf8'));

if (p.version) {
  const version = {
    semver: {
      version: p.version,
    },
  };
  versionInfo = JSON.stringify(version, null, 2);
} else if (existsSync('.git')) {
  const gitInfo = gitDescribeSync();
  versionInfo = JSON.stringify(gitInfo, null, 2);
} else {
  const version = {
    hash: process.env.GIT_REV,
    semver: {
      version: process.env.TRAVIS_TAG,
    },
  };
  versionInfo = JSON.stringify(version, null, 2);
}

versionInfo = `export const version = ${versionInfo}`;

writeFileSync('apps/geomat/src/environments/version.ts', versionInfo);
writeFileSync('apps/dive/src/environments/version.ts', versionInfo);
writeFileSync('apps/ais/src/environments/version.ts', versionInfo);
writeFileSync('apps/planty/src/environments/version.ts', versionInfo);
