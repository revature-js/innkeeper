var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
const DEV_DIR = path.resolve('./dev');
const BUILD_DIR = path.resolve('./public')

module.exports = {
	entry: glob.sync(DEV_DIR + '/**/*.js'),
	output: {
		path: BUILD_DIR,
		filename: "bundle.js"
	}
};
