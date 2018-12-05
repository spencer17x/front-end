# 高阶函数介绍

## 基本概念：

1. 函数可以作为参数被传递
2. 函数可以作为返回值输出

# 高阶组件

## 基本概念

1. 高阶组件就是接受一个组件作为参数并返回一个新组件的函数
2. 高阶组件是一个函数，并不是组件

## 使用高阶组件

1. higherOrderComponent(WrapperComponent)
2. @ higherOrderComponent 

## 在 create-react-app 中使用装饰器

```shell
$ npm run eject

# 安装相关插件：
# 针对 react：
$ npm install bebel-preset-stage-2 --save-dev
$ npm install babel-preset-react-native-stage-0 --save-dev

# 根目录下创建 .babelrc 
{
    "presets": ["react-native-stage-0/decorator-support"]
}
```

# 高阶组件应用

## 代理方式的高阶组件

返回的新组件类直接继承自 React.Component 类，新组件扮演的角色传入参数组件的一个代理，在新组件的 render 函数中，将被包裹组件渲染出来，除了高阶组件自己要做得工作，其余功能全都转手给了被包裹的组件。

## 继承方式的高阶组件

采用继承关联作为参数的组件和返回的组件，假如传入的组件参数是 WrappedComponent，那么返回的组件就直接继承自 WrappedComponent。

