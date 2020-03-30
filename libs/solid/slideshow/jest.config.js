module.exports = {
  name: 'solid-slideshow',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/solid/slideshow',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
