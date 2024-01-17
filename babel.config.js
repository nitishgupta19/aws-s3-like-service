module.exports = {
  only: ['./app/', 'index.js'],
  ignore: ['node_modules/**/**', '.git/**/**'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
