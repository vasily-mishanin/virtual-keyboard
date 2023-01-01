const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getOptimizationConfig = () => {
  const optimizationConfig = { splitChunks: { chunks: 'all' } };
  if (isProd) {
    optimizationConfig.minimizer = [
      new TerserWebpackPlugin(), // minify JS
      new CssMinimizerPlugin(), // minify CSS
    ];
  }
  return optimizationConfig;
};

const cssLoaders = (extraLoaders) => {
  const loaders = [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];
  if (extraLoaders) loaders.push(extraLoaders);
  return loaders;
};

const getPlugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),

    new MiniCSSExtractPlugin({ filename: '[name].[hash].css' }),

    new ESLintPlugin(),
  ];

  if (isProd) basePlugins.push(new BundleAnalyzerPlugin());

  return basePlugins;
};

module.exports = {
  mode: 'development', // or "production" -> minification of code (via NODE_ENV)
  // target: "web",
  context: path.resolve(__dirname, 'src'),

  entry: {
    // index: path.resolve(__dirname, "src/index.js"),
    main: ['@babel/polyfill', './index.js'], // "index" -> [name], __dirname - system variable
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // assetModuleFilename: "assets/[name][ext][query]",
    clean: true,
  },
  devServer: { port: 4200, hot: true, open: true, watchFiles: ['src/**/*'] },
  devtool: 'inline-source-map',

  // LOADERS
  module: {
    rules: [
      { test: /\.css$/, use: cssLoaders() },

      {
        test: /\.(svg|ico|png|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash][ext]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: '[name].[hash][ext]' },
      },

      // BABEL transpiler
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [],
            },
          },
        ],
      },
    ],
  },

  plugins: getPlugins(),

  optimization: getOptimizationConfig(),
};
