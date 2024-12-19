/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/.serverless/"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};