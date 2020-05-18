module.exports = {
  name: 'solid-skeleton',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/skeleton',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
