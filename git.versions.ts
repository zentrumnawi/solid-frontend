const { gitDescribeSync } = require('git-describe');
const { writeFileSync, existsSync, readFileSync } = require('fs');

let versionInfo: any;

const p = JSON.parse(readFileSync('package.json', 'utf8'));

if (p.version) {
  const version = {
    semver: {
      version: p.version,
    }
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
    }
  };
  versionInfo = JSON.stringify(version, null, 2);
}


writeFileSync('apps/app-geomat/src/environments/version.json', versionInfo);
