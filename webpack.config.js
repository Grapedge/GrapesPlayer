const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './scripts/main.js',
    path: path.join(__dirname, 'web'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    compress: true,
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
