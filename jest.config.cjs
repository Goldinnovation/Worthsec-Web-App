const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js
  dir: './'
})

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  /**
   * Custom config goes here, I am not adding it to keep this example simple.
   * See next/jest examples for more information.
   */
  testEnvironment: "node",
 }

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
    preset: 'ts-jest',
  transformIgnorePatterns: [
    // The regex below is just a guess, you might tweak it
    'node_modules/(?!(react-markdown|rehype-raw|remark-gfm)/)',
   
  ],
  transform:
  {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      //  '^.+\\.(css)$': '<rootDir>/config/jest/fileTransform.js', // add this to fix css import issues
     },
       verbose: true,
  forceExit: true,
})

