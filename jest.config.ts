const { getJestProjects } = require('@nx/jest');

export default { projects: [...getJestProjects(), '<rootDir>/libs/tools'] };
