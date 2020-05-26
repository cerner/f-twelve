const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageDotjson = require('./package.json');
const packageName = packageDotjson.name;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  return {
    mode: argv.mode,
    devtool: production ? 'source-map' : 'inline-source-map',
    devServer: {
      publicPath: '/dist/',
      open: true,
      openPage: 'demo/index.html',
      proxy: {
        '/f-twelve': {
          target: 'http://localhost:8080',
          pathRewrite: { '^/f-twelve': '' }
        }
      }
    },
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `${packageName}.js`,
      library: 'fTwelve',
      libraryExport: 'default',
      libraryTarget: 'var',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /(\.jsx?)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: production ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: production ? '[hash:base64:5]' : '[path][name]_[local]',
                context: path.resolve(__dirname, 'src')
              },
            }
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${packageName}.css`,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
