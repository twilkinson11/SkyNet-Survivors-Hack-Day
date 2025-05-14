module.exports = {
    // The root directory that Jest should scan for tests and modules
    rootDir: '.',

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
    ],

    // Transform files with babel-jest
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },

    // Don't transform specific node modules
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
        '^.+\\.module\\.(css|sass|scss)$'
    ],

    // Module name mapper for importing assets and styles in tests
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
    },

    // Setup files to run before each test
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Collect test coverage information
    collectCoverage: false,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/index.jsx',
        '/src/setupTests.js'
    ],

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'],

    // Make calling deprecated APIs throw helpful error messages
    errorOnDeprecated: true,

    // The maximum amount of workers used to run your tests
    maxWorkers: '50%',

    // Display individual test results with the test suite hierarchy
    watchPathIgnorePatterns: ['<rootDir>/node_modules/']
};