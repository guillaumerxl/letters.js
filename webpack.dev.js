var webpack = require('webpack');


module.exports = {
    context: __dirname + "/src",
    entry: "./letters",
    output: {
      path: __dirname + '/lib',
      filename: "letters.js",
      libraryTarget: "var",
      library: "Letters"
    },
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
