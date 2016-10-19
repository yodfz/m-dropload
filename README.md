# 如何使用

[更新说明](developmentTodoList.md)

## 1. 参数说明
```js
Mdropload(node,_opt);
```
node:需要进行操作的节点,可以直接传入`CSS3选择器`，或者`document.querySelect`选中的节点。

_opt:

|参数|说明|
|:---:|:-----|
|height|下拉多少PX进行刷新操作|
|up|参考 fnopt|
|down|参考 fnopt|
|fnopt|{fn:下拉触发的方法 回调方法callback,template:包含需要渲染的各种文字模版}|
   
> template结构   
```js
{
    none: '下拉刷新',
    message: '释放更新',
    loading: '正在更新，请稍后',
    success: '刷新成功',
    end: '虾面没有了', //此字符为底部加载更多独有
    error: '刷新失败'
}
```


fn回调函数 `callback`

+ success 如果刷新成功请回调
+ reset   刷新失败回调此方法用于复位下拉的各种操作
+ end     底部加载更多的时候,如果没有数据了,调用此方法复位,而不是调用success复位.

Mdropload 返回方法

+ destroy 用于销毁整个Mdropload实例


## 2. 引用
普通版:[查看](/dist/MDropload.js)

压缩版:[查看](/dist/MDropload.min.js)

VUE版:[查看](/dist/Mdropload.vue.js)
```html
<script src='src/Mdropload.js'></script>
```

## 3. 使用

```js
Mdropload(document.querySelector('#touchObj'), {
        height: 50
        up: {
            fn: function (cb) {
                console.log('触发了下拉操作');
                setTimeout(function () {
                    cb.success();
                }, 1000);
            },
            template: {
                none: '下拉刷新',
                message: '释放更新',
                loading: '正在更新，请稍后',
                success: '刷新成功',
                error: '刷新失败'
            }
        },
        down: {
            fn: function (cb) {
                console.log('触发了上拉操作');
                cb.success();
                // 重置操作
                // cb.reset();
            },
            template: {
                none: '上拉刷新',
                message: '释放更新',
                loading: '正在更新，请稍后',
                success: '刷新成功',
                error: '刷新失败'
            }
        }
    });
```

## 4. vue使用

```
npm install --save vue-dropload
```

### 在项目中引用

```js
import vuedropload from 'vue-dropload';
import vue from 'vue';
vue.use(vuedropload);
```

### 使用

```js
import Hello from './components/Hello'
import vue from 'vue'
export default {
  components: {
    Hello
  },
  mounted () {
    console.log('ready ok')
    vue.Mdropload(
      document.querySelector('#app'),
      {
        height: 50,
        up: {
          fn: function (cb) {
            console.log('触发了下拉操作')
            setTimeout(function () {
              cb.success()
            }, 5000)
          },
          template: {
            none: '下拉刷新',
            message: '释放更新',
            loading: '正在更新，请稍后',
            success: '刷新成功',
            error: '刷新失败'
          }
        },
        down: {
          fn: function (cb) {
            console.log('触发了上拉操作')
            cb.success();
          },
          template: {
            none: '上拉刷新',
            message: '释放更新',
            loading: '正在更新，请稍后',
            success: '刷新成功',
            error: '刷新失败'
          }
        }
      }
    )
  }
}
```
[前往DEMO](/example/vueDemo/src/App.vue)

## 5. 错误查询

1001:无法寻找到可设置的html节点,请确认后再次调用.

传入的需要设置的节点是null.


## 6. 如何控制样式?

