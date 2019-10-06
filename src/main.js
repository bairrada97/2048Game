import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyA1eOyIjl8rZFJ7Ax1G_0vUc1fwkP_KKb0",
  authDomain: "play2048game.firebaseapp.com",
  databaseURL: "https://play2048game.firebaseio.com",
  projectId: "play2048game",
  storageBucket: "play2048game.appspot.com",
  messagingSenderId: "844290688913",
  appId: "1:844290688913:web:cf4727b2bfaade86243c30"
};

Vue.prototype.$firebase = firebase;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
