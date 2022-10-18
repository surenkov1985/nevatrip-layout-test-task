const path = require("path");
const fs = require("fs");
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV;

const build = {
	context: path.resolve(__dirname, "./src"),
	mode: mode,

	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/styles/[name].[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			filename: "tour.html",
			template: "tour.html",
			chunks: ["tour"],
		}),
		new CopyPlugin({
			patterns: [{ from: "static", to: "", noErrorOnMissing: true }],
		}),
	],
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	entry: {
		index: ["@babel/polyfill", "whatwg-fetch", "./index.js"],
		tour: ["@babel/polyfill", "whatwg-fetch", "./tour.js"],
	},
	resolve: {
		alias: {
			"": path.resolve(__dirname, "src/"),
		},
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		minimize: true,
		minimizer: [
			new OptimizeCssPlugin(),
			new TerserWebpackPlugin({
				extractComments: false,
			}),
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "assets/js/[name].[contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: ["html-loader"],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { importLoaders: 1 },
					},
					{
						loader: "postcss-loader",
						// options: {
						// 	postcssOptions: {
						// 		plugins: [require("autoprefixer")],
						// 	},
						// },
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png|svg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/img/[name][ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]",
				},
			},
			{
				test: /\.js$/,
				exclude: /node-modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-object-rest-spread"],
					},
				},
			},
		],
	},
};

const dev = {
	devtool: "source-map",
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, "src"),
		},
		open: true,
		port: 8081,
		host: "localhost",
		compress: true,
		hot: true,
		liveReload: true,
		client: {
			overlay: {
				warnings: true,
				errors: true,
			},
		},
	},
};

module.exports = Object.assign(build, mode === "development" ? dev : {});
