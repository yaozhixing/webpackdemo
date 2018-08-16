const path = require('path');
const webpack = require('webpack');
const WebpackMerge = require("webpack-merge");
const baseConfig = require('./webpack.base.config');

const root = path.resolve(__dirname, '../');

module.exports = WebpackMerge(baseConfig,{
	
	/*输出文件*/
	output: {
		path: path.resolve(root, 'dist'),		//路径
		filename: 'bundle.js',					//打包名称 
	},
	
	//设置webpack本地服务器的配置
	devServer:{
		contentBase: path.resolve(root, './'),
		port:'8383',	//监听端口
		inline:true,	//设置为true，当源文件改变的时候会自动刷新
		historyApiFallback:true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		//hot:true,		//允许热加载
		proxy: {
			"/api": {
				"target": "http://192.168.1.120",
				"changeOrigin": true,
				"pathRewrite": {"^/api": "/api"}
			}
		},
	},
	
	//设置source map选项
	devtool:'source-map'
})