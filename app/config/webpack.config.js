var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var path = require('path');
var glob = require('glob');
const DEV_DIR = path.resolve('./dev');
const BUILD_DIR = path.resolve('./public')

module.exports = {
	entry: glob.sync(DEV_DIR + '/**/*.js'),
	output: {
		path: BUILD_DIR,
		filename: "bundle.min.js"
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
			},
			{
				from: DEV_DIR+'/loginRegistration/views',
				to: BUILD_DIR+'/loginRegistration/views'
			},
			{
				from: DEV_DIR+'/Room_Apt/views',
				to: BUILD_DIR+'/Room_Apt/views'
			}
		]),
		new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
	]
};
