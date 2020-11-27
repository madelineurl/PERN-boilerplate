module.exports = {
  mode: "development",
  entry:  ["@babel/polyfill", './src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,
  //       exclude: /node_modules/,
  //       loader: 'babel-loader'
  //     }
  //   ]
  // }
}
