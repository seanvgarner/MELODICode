module.exports = {
  entry: "./scripts/melodicode.js",
  output: {
    path: __dirname + "/scripts",
    filename: "bundle.js"
	},
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  }
};
