const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");			//打包html
const ExtractTextPlugin = require("extract-text-webpack-plugin");	//style分离外部调用
const CleanWebpackPlugin = require("clean-webpack-plugin");			//清空文件夹

const extractcss = new ExtractTextPlugin("[name].one.[chunkhash:10].css");		//打包第一个css
const extractless = new ExtractTextPlugin("[name].two.[chunkhash:10].css");		//打包第二个less转换的css

const root = path.resolve(__dirname, '../');

module.exports = {
	/*入口文件*/
	entry: path.resolve(root, 'src/main.js'),
	
	module: {
		rules: [
			/*css 规则*/
			{
				test: /\.css$/,
				use: extractcss.extract(["css-loader"])
			},
			
			/*less 规则*/
			{
				test: /\.less$/,
				use: extractless.extract(["css-loader","less-loader"])
			},
			
			/*图片 规则*/
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				use: [
					{
						loader:"file-loader?limit=8192&name=[name].[ext]",
						options: {
							publicPath:'./images/',			//发布目录 ./是css文件和index.html img 的的相对路径
							outputPath:'images/'			//输出目录 创建文件夹
						}
					},
				]
			},
			
			/*js ES6转换ES5 规则*/
			{
				test:/\.js|jsx$/,
				exclude:/(node-modules|bower-components)/,
				use: {
					loader:"babel-loader",
					options: {
						presets:['env'] 	//稳定版本
					}
				}
			},
			
			{
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
			
			{
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 除了img的src,还可以继续配置处理更多html引入的资源
                    attrs: ['img:src', 'img:data-src', 'audio:src']
                }
            },
			
		]
	},
	
	/*插件配置*/
	plugins:[
		//清空输出目录
		new CleanWebpackPlugin(['dist'],{
			root: path.resolve(__dirname, '../')   	//根目录
		}),
		
		new HtmlWebpackPlugin({
			hash:true,
			template:"./src/index.html"
		}),
		
		//打包多个css，css和less转换的css
		extractcss,
		extractless
	]
		
};