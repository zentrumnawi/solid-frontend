module.exports = {
  name: 'solid-quiz',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/quiz',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
