const path = require('path');
const webpack = require('webpack');
const WebpackMerge = require("webpack-merge");
const baseConfig = require('./webpack.base.config');

const root = path.resolve(__dirname, '../');

module.exports = WebpackMerge(baseConfig,{
	
	/*输出文件*/
	output: {
		path: path.resolve(root, 'dist'),		//路径
		filename: 'bundle.[chunkhash:10].js'					//打包名称
	},
	
})