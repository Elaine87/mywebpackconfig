## 项目运行

```bash
# 安装依赖
npm install

# 开发的时候在本地启，并开始热加载
npm run dev

# qa的发布时打包(开启console)
npm run build

# production的发布时打包(关闭console，去除debugger,console)
npm run build

```

## 分支管理

```bash
#master
master 与线上代码保持一致

#项目名-dev
开发分支，用于开发新功能

#项目名-qa
测试分支，用于测试，测试通过后可合并到master分支

#项目名-###
如有其他需要，可新建分支，无误后及时合并代码删除分支

```

## 目录结构

```
└─ build                                // webpack打包配置
│    ├─  webpack.base.config.js         // webpack基本配置文件
│    ├─  webpack.dev.config.js          // 开发环境webpack基本配置文件
│    ├─  webpack.base.config.js         // 线上环境webpack基本配置文件
│    └─  webpack.base.config.js         // 测试环境webpack基本配置文件
│
└─ config                                // 项目基本配置
│    ├─  index.js                    // 基本环境配置
│    └─  project.config.js                 // 打包项目配置
│
└─ dist                                 // 打包生成文件
│
└─ mock                                 // mock数据
│
└─ src                                 // src 文件夹
│    ├─pages
│    │   └─myProject                   // 项目文件夹(按项目分打包，page.config.js 可配置打包项目)
│    │       ├─page1                    // 页面 （页面html需与文件夹同名）
│    │         ├─page1.js
│    │         ├─page1.html
│    │         ├─page1.sass
│    │         ...
│    ├─assets                         // 静态资源
│    │   ├─css                         // 基础CSS
│    │   └─images                      // 图片(按项目分)
│    │       ├─myProject
│    │       │   ├─pic.png
│    │      ...
│    │
│    └─lib                             //工具
│    │  ├─utils                        // 封装
│    │  │   ├─ utils.js
│    │  │   ├─ bridge.js
│    │  │   ...
│    │  └─vendors                      //第三方
│    │      ├─ zepoto.js
│    │      ├─ felxibel.js
│    │      ....
│    └─ specialfiles    // 各个项目的特殊配置
│        │
│        ├─carReport  //项目名称
│
├─  .gitignore                        //其他配置文件
├─  eslintconfig                      // eslint配置文件
├─  .....
```
