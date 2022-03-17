const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  output: {
    path: path.join(__dirname + '/dist'),
    filename: '[name].bundle.js', //The name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i, //identify the type of files to pre-process
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false, //for img file names
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets/');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    }),
  ],
  mode: 'development',
};
