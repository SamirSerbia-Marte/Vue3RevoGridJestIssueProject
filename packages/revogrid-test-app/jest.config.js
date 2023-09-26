module.exports = {
  maxWorkers: '50%',
  moduleNameMapper: {
    '/^vue$/': 'vue/dist/vue.common.js',
    '^@/(.*svg)(\\?inline)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.png$': 'jest-transform-stub',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  globals: {
    'vue-jest': {
      babelConfig: false,
      NODE_ENV: 'test',
    },
  },
  setupFiles: ['jest-canvas-mock'],
};
