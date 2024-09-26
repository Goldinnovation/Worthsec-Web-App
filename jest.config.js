/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [                       //tells jest where to find the test 
    '**/__tests__/**/*.test.ts', 
    '**/?(*.)+(spec|test).ts' 
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform .ts files using ts-jest
  },
  verbose: true,   //indicates if individual test should reported during the run
  forceExit: true,  // wants our test should run even if there might be errors 
  // clearMocks: true
  

};