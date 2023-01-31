// eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/no-var-requires
const OmazeUI = require('@omaze/omaze-ui');

module.exports = {
    ...OmazeUI.tailwind,
    purge: [
        './**/*.ts',
        './**/*.tsx',
    ],
    plugins: [
        ...OmazeUI.tailwind.plugins,
        require('@tailwindcss/aspect-ratio'),
    ],
};
