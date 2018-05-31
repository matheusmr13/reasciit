const path = require('path');

const appDirectory = process.cwd();
process.env.NODE_PATH = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter(folder => folder && !path.isAbsolute(folder))
	.map(folder => path.resolve(appDirectory, folder))
	.join(path.delimiter);

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	bail: true,
	target: 'node',
	devtool: 'source-map',
	entry: [resolveApp('src/application/index.js')],
	output: {
		path: resolveApp('build'),
		filename: 'index.js',
		libraryTarget: 'umd'
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.json']
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: resolveApp('node_modules/'),
				include: resolveApp('src'),
				loader: require.resolve('babel-loader')
			}
		]
	},
	alias: {
		reasciit: path.resolve(__dirname, 'src/reasciit/')
	}
};
