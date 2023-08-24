/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      verbose: true,
      transform: {
        "^.+\\.tsx?$": "ts-jest"
      },
      testEnvironment: "jsdom"
    };
};