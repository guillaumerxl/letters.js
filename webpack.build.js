var webpack = require('webpack');


module.exports = {
    context: __dirname + "/src",
    entry: "./letters",
    output: {
      path: __dirname + '/lib',
      filename: "letters.min.js",
      libraryTarget: "var",
      library: "Letters"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
    module: {
      loaders: [{
        test: /(\.js)$/,
        loader: 'babel',
        include: [
          __dirname + "/src",
        ]
      }]
    }
};
