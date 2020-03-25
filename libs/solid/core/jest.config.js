module.exports = {
  name: 'solid-core',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/core',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
