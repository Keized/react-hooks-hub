/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      preset: 'ts-jest',
      verbose: true,
      transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.js?$": "babel-jest"
      },
      testEnvironment: "jsdom",
      transformIgnorePatterns: ['//node_modules']
    };
};