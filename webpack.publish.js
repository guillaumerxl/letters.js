var webpack = require('webpack');


module.exports = {
    context: __dirname + "/src",
    entry: "./letters",
    output: {
      path: __dirname + '/lib',
      filename: "letters-common.js",
      library: "Letters",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: [{
        test: /(\.js)$/,
        loader: 'babel',
        query: {
          moduleId: 'Letters'
        },
        include: [
          __dirname + "/src",
        ]
      }]
    }
};
