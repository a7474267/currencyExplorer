import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import FlagIcon from "vue-flag-icon";
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(FlagIcon);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
