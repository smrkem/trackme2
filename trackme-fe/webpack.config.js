const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2', 'react']
          }
        }
      },
      {
      test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
}
