const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter(folder => folder && !path.isAbsolute(folder))
	.map(folder => path.resolve(appDirectory, folder))
	.join(path.delimiter);

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: [paths.appIndexJs],

	output: {
		path: paths.appBuild,
		filename: 'index.js',
		libraryTarget: 'umd'
	},

	resolve: {
		modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
		extensions: ['.js', '.json']
	},

	externals: {
		child_process: 'child_process',
		fs: 'fs'
	},

	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				include: paths.appSrc,
				loader: require.resolve('babel-loader'),
				options: {
					compact: true
				}
			}
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				comparisons: false
			},
			mangle: {
				safari10: true
			},
			output: {
				comments: false,
				ascii_only: true
			},
			sourceMap: shouldUseSourceMap
		})
	]
};
