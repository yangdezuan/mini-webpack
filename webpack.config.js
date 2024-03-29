const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ISDEV = process.env.NODE_ENV === 'development';
const ScssArr = ['vue-style-loader', 'css-loader', 'sass-loader'];
const CssArr = ['css-loader'];
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js?[hash]'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css?[hash]', //修改过的地方
      allChunks: true
    }),
    //new ExtractTextPlugin('styles.css'),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin() //Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的.
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ISDEV
          ? ['vue-style-loader', 'css-loader']
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: CssArr
            })
      },
      {
        test: /\.scss$/,
        use: ISDEV
          ? ScssArr
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: CssArr
            })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ISDEV
              ? ScssArr
              : ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: ['css-loader', 'sass-loader']
                }),
            css: ISDEV
              ? ['vue-style-loader', 'css-loader']
              : ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: CssArr
                })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      /*
      '@c': path.resolve('public/src/compontnts'),
      '@a': path.resolve('public/src/assets')
      */
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    noInfo: true,
    quiet: false, // 控制台中不输出打包的信息
    hot: false, // 不需启动
    inline: true,
    port: 8081,
    lazy: false, // 不启动懒加载
    host: 'localhost', // 10.253.36.80
    progress: false, // 显示打包的进度
    overlay: true,
    watchOptions: {
      aggregateTimeout: 300
    },
    disableHostCheck: true,
    /*  contentBase: "../static",
         publicPath: "../static", */
    /*    contentBase: "./public",//本地服务器所加载的页面所在的目录
           colors: true,//终端中输出结果为彩色
           historyApiFallback: true,//不跳转
           inline: true,//实时刷新 */
    proxy: {
      '/index.php': {
        // '/api':匹配项
        target: 'http://api.steamchin.net/index.php', // 接口的域名 // secure: false,// 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置 // pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址 //   '^api': ''
        // }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    })
  ]);
}
