import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset({ useESM: true}).transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",  
  moduleNameMapper: {
    '^(\\.\\.?/?.*)\\.js$': '$1'
  },
  moduleFileExtensions: [
    'js', 'json', 'ts', 'tsx', 'node', 'mjs', 'd.ts'
  ]

};

