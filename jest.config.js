module.exports = {
    resetMocks: true,
    resetModules: true,
    coverageThreshold: {
        global: {
            branches: 6,
            functions: 4,
            lines: 3,
            statements: 3,
        },
    },
    coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/coverage/',
        '<rootDir>/scripts/',
        '<rootDir>/storybook-static/',
        '.*\\.d\\.ts',
        '<rootDir>/assets',
        '<rootDir>/src/js/build',
        '<rootDir>/src/vendor',
        '<rootDir>/src/js/polyfill',
        '<rootDir>/src/js/plugins',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    moduleNameMapper: {
        '.+\\.(styl|less|sass|scss|jpg|png|gif|svg|ttf|woff|woff2)$':
            'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.styles\\.css$': '<rootDir>/node_modules/jest-css-modules-transform',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/webpack/react/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
    ],
    testURL: 'http://localhost/',
    setupFiles: ['./jest.setup.js'],
};
