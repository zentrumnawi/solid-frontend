module.exports = {
  name: 'dive',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dive',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
