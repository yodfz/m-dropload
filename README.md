# 如何使用

## 参数说明
```js
Mdropload(node,_opt);
```
node:需要进行操作的节点

_opt:

|参数|说明|
|:---:|:-----|
|height|下拉多少PX进行刷新操作|
|up|参考 fnopt|
|down|参考 fnopt|
|fnopt|{fn:下拉触发的方法,template:包含需要渲染的各种文字模版}|
   
> template结构   
```js
{
    none: '下拉刷新',
    message: '释放更新',
    loading: '正在更新，请稍后',
    success: '刷新成功',
    error: '刷新失败'
}
```
|

## 引用
普通版:[查看](/dist/MDropload.js)
压缩版:[查看](/dist/MDropload.min.js)
VUE版:[查看](/dist/Mdropload.vue.js)
```html
<script src='src/Mdropload.js'></script>
```

## 使用

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

## vue使用

```
npm install --save vue-dropload
```

### 在项目中引用

```js
import vue-dropload from 'vue-dropload';
import vue from 'vue';
vue.use(vue-dropload);
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

## 错误查询

1001:无法寻找到可设置的html节点,请确认后再次调用.

传入的需要设置的节点是null.

