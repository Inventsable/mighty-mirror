import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.devtools = false;

import VueWorker from "vue-worker";
Vue.use(VueWorker, "$worker");

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
