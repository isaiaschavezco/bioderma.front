import Vue from "vue";
import Antd from 'ant-design-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.css';
import { axiosInstance } from './axios/index';
import CKEditor from '@ckeditor/ckeditor5-vue';
// import { socketInstance } from './sockets/index';
// import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(CKEditor);

Vue.prototype.$axios = axiosInstance;
// Vue.use(VueSocketIO, socketInstance);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
