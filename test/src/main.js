import Vue from 'vue'
import App from './App.vue'
import locomotiveScroll from "locomotive-scroll";

Object.defineProperty(Vue.prototype, "locomotiveScroll", {
  value: locomotiveScroll
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
