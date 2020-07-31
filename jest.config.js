const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
  },
  testRegex: '(test).(ts?|tsx?)$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'd.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setupEnzyme.ts',
};
