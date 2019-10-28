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

```PHP
前端开发需要增加配置
"public/index.php"
前端本地git版本控制 可以忽略此文件
git update-index --assume-unchanged webpack.config.js

还原
git update-index --no-assume-unchanged webpack.config.js
想找出所有被忽略的文件
git ls-files -v | grep '^h\ ' | awk '{print $2}'
