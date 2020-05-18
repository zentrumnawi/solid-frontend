module.exports = {
  name: 'solid-profile',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/profile',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
