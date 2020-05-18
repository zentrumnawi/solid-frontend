module.exports = {
  name: 'geomat',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/geomat',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
