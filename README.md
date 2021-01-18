### webpack搭建react环境

##### 支持技术栈
react + react-router + ant-design（按需引入） + less(模块化调用) + mock数据 + redux-sagas

##### 版本信息
* webpack版本 ^4.44.2
* react版本 ^16.13.1

##### 架构规范

##### 使用注意
* 在开发环境下，将react相关代码分离打包，故首次执行时应先执行`npm run dll`，然后执行`npm start`。之后每次只执行`npm start`即可。
* 背景图使用图片资源时，将图片放入assets目录，然后`background-image: url('assets/bg.jpg')`引入即可
* img对象使用图片资源时，将图片放入assets目录，然后通过`import imgName from "./path";`方式引入使用图片
* 目前的配置，需要将dist目录放入服务器跟目录方可访问资源，可更改publicPath进行变更

##### 待整改
* 生产无需引入`./react.dll.js`，（分开开发环境和生产环境的html模版）
* 打包一次后dist目录内容污染，下次开发需要重新`npm run dll`，（区分生产环境和开发环境的打包目录）