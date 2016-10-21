<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue at this boilerplate's
      <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
    </p>
  </div>
</template>

<script>
import Hello from './components/Hello'
import vue from 'vue'
export default {
  components: {
    Hello
  },
  // 注意 mounted 是2.0用法
  // 1.0 请使用ready() 或者 vue.@nexttick 自行把控
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
            cb.success()
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
</script>

<style>
html {
  height: 100%;
}

body {
  align-items: center;
  justify-content: center;
  height: 100%;
}
.js-mdropload-down{
  text-align: center;
}

#app {
  color: #2c3e50;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
