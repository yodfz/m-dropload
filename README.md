# 如何使用

## 引用
```html
<script src='src/index.js'></script>
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