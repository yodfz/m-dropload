# 如何使用

## 引用
普通版:[查看](/dist/MDropload.js)
压缩版:[查看](/dist/MDropload.min.js)
VUE版:[查看](/dist/MDropload.vue.js)
```html
<script src='src/Mdropload.js'></script>
```

## 使用

```js
Mdropload(document.querySelector('#touchObj'), {
        height: 50,
        up: {
            fn: function (success) {
                console.log('触发了下拉操作');
                setTimeout(function () {
                    success();
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
            fn: function (success) {
                console.log('触发了上拉操作');
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
          fn: function (success) {
            console.log('触发了下拉操作')
            setTimeout(function () {
              success()
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
          fn: function (success) {
            console.log('触发了上拉操作')
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

