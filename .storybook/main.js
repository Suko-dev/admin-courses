const path = require('path');

module.exports = {
  stories: [],
  core: {
    builder: 'webpack5',
  },
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    // Return the altered config
    return config;
  },
};
