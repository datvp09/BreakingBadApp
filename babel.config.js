module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.svg',
        ],
        alias: {
          '@assets': './src/assets',
          '@containers': './src/containers',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@redux': './src/redux',
          '@core': './src/core',
          '@theme': './src/theme',
        },
        cwd: 'babelrc',
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
