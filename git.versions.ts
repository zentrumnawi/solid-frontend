const { gitDescribeSync } = require('git-describe');
const { writeFileSync, existsSync } = require('fs');

let versionInfo: any;

if (existsSync('.git')) {
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


writeFileSync('src/environments/version.json', versionInfo);
