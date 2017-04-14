"use strict";
const webpack = require("webpack");
const path = require("path");
const loaders = require("./webpack.loaders");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

const bootstrapEntryPoints = require("./webpack.bootstrap.config.js");
const DotenvPlugin = require("webpack-dotenv-plugin");


const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// global css
loaders.push({
	test: /\.css$/,
	exclude: /[\/\\]src[\/\\]/,
	use: [
		{
			loader: "style-loader",
			options: {
				sourceMap: true
			}
		},
		"css-loader"
	]
});

// local scss modules
loaders.push({
	test: /\.scss$/,
	exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
	use: [
		{
			loader: "style-loader",
			options: {
				sourceMap: true
			}
		},
		{
			loader: "css-loader",
			options: {
				modules: true,
				importLoaders: 1,
				camelCase: "dashes"
			}
		},
		"postcss-loader",
		"sass-loader"
	]
});

// local css modules
loaders.push({
	test: /\.css$/,
	exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
	use: [
		"style-loader",
		"css-loader",
		"postcss-loader"
	]
});

loaders.push({
	test: /bootstrap-sass\/assets\/javascripts\//,
	use: 'imports-loader?jQuery=jquery'
});

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.jsx' // your app's entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: loaders
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				pathRewrite: {"^/api": ""}
			}
		}
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new DotenvPlugin({
			sample: "./.env.default",
			path: "./.env"
		}),
		new HtmlWebpackPlugin({
			template: './src/template.html'
		}),
	]
};
