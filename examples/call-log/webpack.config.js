var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    libraryTarget: "commonjs"
  },
  target: 'node',
  externals: [nodeExternals()].concat(['../../dist/build']),
  module: {
    // module.rules is the same as module.loaders in 1.x
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
