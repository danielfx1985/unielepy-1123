// unielepy-----django-vue-lyadmin----mainjs--
import stopRepeatClick from './utils/stopRepeatClick.js';
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import common from '@/api/common'

Vue.prototype.$stopRepeatClick = stopRepeatClick
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

//uview-ui
import uView from '@/uni_modules/uview-ui';  
Vue.use(uView);
Vue.prototype.$common = common;

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$stopRepeatClick = stopRepeatClick;
  return {
    app
  }
}
// #endif