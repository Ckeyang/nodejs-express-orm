# 衣橱运营管理后台
    此框架使用了：express，orm，ejs（ejs有什么用呢，在你的前端页面的时候直接使用ejs的语法就能使用）
    此后台只为client服务器提供数据，不进行显示，或者渲染
    数据库使用的mysql
##结构

    config                                         //放置配置文件
    controllers                                    //放置控制器（操作service）
    logs                                           //日志文件打印位置
    models                                         //存放models
    route                                          //路由
    service                                        //服务层用来管理models
    utils                                          //工具包
    app.js                                         //node后台的基础配置
    server.js                                      //服务器

以上东西在开发时，只需要在route,models,controllers,config,service里面进行操作

utils可以新增工具

app.js和server.js最好不要修改

## 首先安装 npm

#### 下载模块

    npm install

#### 启动模块

    npm start

#### 配置脚本

package.json 里的 scripts 进行配置

###node 执行
node server.js  环境变量

环境变量可以不写，默认为local环境

示例dev环境：
node server.js dev


###pm2 执行
pm2 start server.js -- 环境变量

不填默认为 local环境

示例：
pm2 start server.js -- dev

###单元测试
单元测试切换环境
默认为local环境配置文件，如果需要切换其他环境在环境变量添加 NODE_ENV变量，并赋值 NODE_ENV=locallance，
程序启动的时候会优先加载locallance的配置文件。

