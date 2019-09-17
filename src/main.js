import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
