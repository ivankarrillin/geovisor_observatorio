const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WebpackProvideGlobalPlugin=require('webpack-provide-global-plugin');
var webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  //watch: true,
    cache: true,
  // Path to your entry point. From this file Webpack will begin his work
  entry: {
          index1:'./app/js/index1.js',
          login:'./app/js/login.js',
  	    },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    //publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot:true
  },



  module: {
    rules: [
        {test: /\.css?$/,include: /node_modules/,  loaders: ['style-loader', 'css-loader']},
        {
            test: /\.scss?$/,
            
            use: [
              MiniCSSExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],


        },
        
        { test: /\.json$/,type:'javascript/auto', loader: 'json-loader' },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },{
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
          loader: 'file-loader'
        },
        {test: /\.(png|jpg)$/, loader: "file-loader?name=img/[name].[ext]"}
    ]
},
plugins: [

      new HtmlWebpackPlugin({  
        filename: './index.html',
        template: './app/index.html',
        chunks: ["index1"]
      }),
      new HtmlWebpackPlugin({  
        filename: './login.html',
        template: './app/login.html',
        append: false,
        chunks: ["login"]

      }),
      new MiniCSSExtractPlugin({
        filename: 'css/[name].css',
        template: './app/css/styles.scss'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new CompressionPlugin()
  ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'production',
};