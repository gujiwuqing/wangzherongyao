import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/utils/element'
import '@/styles/base.scss' // global css
// import echarts from '@/utils/echarts'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
