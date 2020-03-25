module.exports = {
  name: 'solid',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/solid',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
