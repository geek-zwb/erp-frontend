> 自用订单管理

## 技术栈
- react
- react-dom
- react-router-dom
- prop-types
- redux
- react-redux
- react-router-redux
- redux-saga
- immutable
- redux-immutable
- styled-components
- antd
- store
- axios

## 开发流程与规范
严格遵循[webpack-init](https://github.com/geek-zwb/react-init)中的原则。
## Folder Structure

```
order-manager/
  README.md
  config    # 构建
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    common  # 公共的 组件等
    modules # 模块
        Dashboard   # 模块名 ( pascal-case ? )
            actions     # Dashboard 模块下的 action
            reducers     # Dashboard 模块下的 reducer
            sagas    # Dashboard 模块下的 saga
            index.js
    redux   # 数据 状态管理
        reducers    # root reducer
            index.js
        sagas   # root saga
            index.js
        store   # rootStore
            index.js
    utils   # 包括一些共用的方法函数等
    styles      # 全局的 css
    static      # 静态资源文件，包括字体、图片等
    App.js
    index.js
    logo.svg
```
