import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./vuex/store";
import { apiClient } from "./plugins/restclient.js";
import VueMeta from "vue-meta";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import '@/plugins/loader-overlay';
import '@/plugins/vuelidate';
import filters from '@/plugins/filters'
import VueSweetalert2 from 'vue-sweetalert2';
import "./plugins/mixins";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Editor from 'v-markdown-editor'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import moment from 'moment'

Vue.prototype.moment = moment
// global register
Vue.component('VueSlider', VueSlider)
const options = {
  confirmButtonColor: '#D94F00',
  cancelButtonColor: '#F4F5f7',
};
Vue.use(VueSweetalert2, options);
Vue.use(Editor);

Vue.use(VueKatex, {
  globalOptions: {
    //... Define globally applied KaTeX options here
  }
});

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.component('VOffline', require('v-offline'));

Vue.component('v-select', vSelect)

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

Vue.config.productionTip = false


const app = new Vue({
  router,
  store,
  beforeCreate() {
      this.$store.commit("INIT_STORE");
  },
  created() {
    apiClient.interceptors.response.use(
          (response) => response,
          (error) => {
              if (error.response.message === 'access denied') {
                  this.$store.dispatch("logout");
              }
              return Promise.reject(error);
          }
      );
  },
  render: h => h(App),
}).$mount('#app')

export default app;