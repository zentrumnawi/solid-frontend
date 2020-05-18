module.exports = {
  name: 'solid-glossary',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/glossary',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
