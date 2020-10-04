require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageDotjson = require('./package.json');
const packageName = packageDotjson.name;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
      usedExports: true,
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
          test: /\.(s?css)$/,
          use: [
            {
              loader: production ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: production ? '[hash:base64:5]' : '[name]_[local]_[hash:base64:5]',
                context: path.resolve(__dirname, 'src')
              },
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `${packageName}.css`,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
