# mini-webpack
基于vue简易版webpack demo

### Install
```sh
#如果报错，提示缺少什么
npm install
#开发人员使用，监视静态文件，执行相应任务, 带sourceMap
npm run serve
#打包产品
npm run build
```
### 前端开发需要增加配置
```PHP
"public/index.php"
前端本地git版本控制 可以忽略此文件
git update-index --assume-unchanged webpack.config.js

还原
git update-index --no-assume-unchanged webpack.config.js
想找出所有被忽略的文件
git ls-files -v | grep '^h\ ' | awk '{print $2}'
```
### 升级配置
 1. babel-loader 版本不能过高，8.0+ 不稳定
 2. 引入 extract-text-webpack-plugin@next (webpack4.0 不支持)
```js
 new ExtractTextPlugin({
    filename: '[name].css?[hash]', //修改过的地方
    allChunks: true
  }),
```
 3. webpack4 需要增加mode配置
```js
cross-env webpack --mode production --progress --hide-modules
```
