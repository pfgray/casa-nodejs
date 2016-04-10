
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

module.exports = function() {
  var myConfig = Object.create(webpackConfig);
  new WebpackDevServer(webpack(myConfig), {
  	publicPath: myConfig.output.publicPath,
  	stats: {
  		colors: true
  	},
    hot: true,
    quiet: false
  }).listen(9001, "localhost", function(err) {
  	if(err) throw new Error("webpack-dev-server", err);
    console.log('Bundling project, please wait...');
  });
};
