// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

fastclick.attach(document.body);  //移动端点击时间300ms延迟

Vue.use(lazyload,{
  loading: require('common/images/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
