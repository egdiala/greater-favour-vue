import Vue from 'vue';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

const options = {
    width: 30,
    height: 30,
    blur:"0",
    backgroundColor: '#000',
    opacity: 0.4,
    // loader: "bars"
}
Vue.use(
  Loading,
  options
);