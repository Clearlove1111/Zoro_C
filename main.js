import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'


Vue.config.productionTip = false
Vue.use(ElementUI);

//添加全局前置导航守卫


new Vue({
  router,
  store,//Vue实例
  render: h => h(App),
}).$mount('#app')

