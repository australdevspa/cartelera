// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css'
import store from './store'
import vueScrollto from 'vue-scrollto'

Vue.use(vueScrollto)
// loads the Icon plugin
UIkit.use(Icons);
Vue.config.productionTip = false
window.UIkit = UIkit;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})