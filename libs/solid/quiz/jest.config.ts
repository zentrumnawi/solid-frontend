/* eslint-disable */
export default {
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/solid/quiz',

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  displayName: 'solid-quiz',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
