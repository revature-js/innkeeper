var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var glob = require('glob');
const DEV_DIR = path.resolve('./dev');
const BUILD_DIR = path.resolve('./public')

module.exports = {
	entry: glob.sync(DEV_DIR + '/**/*.js'),
	output: {
		path: BUILD_DIR,
		filename: "bundle.js"
	},
	plugins: [
		new CopyWebpackPlugin([
			{ 
				from: DEV_DIR+'/reimbursement/views',
				to: BUILD_DIR+'/reimbursement/views'
			},
			{
				from: DEV_DIR+'/Maintenance/views',
				to: BUILD_DIR+'/Maintenance/views'
			}
		])
	]
};
