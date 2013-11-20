# saber-button

[`SaberUI`](https://github.com/ecomfe/saber-ui)的Button控件。`ECOM UI v1.1`规范实现。


## Dependencies

+ [saber-lang](https://github.com/ecomfe/saber-lang)
+ [saber-dom](https://github.com/ecomfe/saber-dom)
+ [saber-ui](https://github.com/ecomfe/saber-ui)
+ [saber-control](https://github.com/ecomfe/saber-control)


## Usage

通过[`edp`](https://github.com/ecomfe/edp)导入

	edp import saber-button

## API

### Option

+ `content`: 按钮显示文字

更多配置项，请参考父类[`Control`](https://github.com/ecomfe/saber-control/blob/master/doc/api-control.md#option)


### Property

#### content

按钮显示文字，类型`String`，默认值`''`

例子

```javascript
var button = new Button({ content: 'test' });
console.info( button.get( 'content' ) ); // test
```

更多实例属性，请参考父类[`Control`](https://github.com/ecomfe/saber-control/blob/master/doc/api-control.md#property)


### Method

#### .setContent(content)

设置按钮内容，可以是HTML内容

`content`: 要设置的按钮内容。类型`String`。

例子

```javascript
var button = new Button({ content: 'test' });
console.info( button.get( 'content' ) ); // test
button.setContent( 'new' );
console.info( button.get( 'content' ) ); // new
```
更多实例方法，请参考父类[`Control`](https://github.com/ecomfe/saber-control/blob/master/doc/api-control.md#method)


### Event

#### click

当按钮被点击后触发，附带参数依次为`ev`、`event`:

`ev`: 事件信息对象

+ `type`: 事件类型名，类型`String`
+ `target`: 触发事件的按钮控件对象，类型[`Button`](https://github.com/ecomfe/saber-button)

`event`: DOM原生事件对象


更多事件，请参考父类[`Control`](https://github.com/ecomfe/saber-control/blob/master/doc/api-control.md#event)



===

[![Saber](https://f.cloud.github.com/assets/157338/1485433/aeb5c72a-4714-11e3-87ae-7ef8ae66e605.png)](http://ecomfe.github.io/saber/)