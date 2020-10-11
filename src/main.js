import Vue from 'vue';
import 'bootstrap';
import $ from 'jquery';
import Toastr from 'vue-toastr';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate'; // 驗證套件
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import money from './filter/money'; // 自定義元件
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

window.$ = $;

Vue.prototype.$bus = new Vue();

Vue.component('Loading', Loading);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
}); // 所有驗證規則

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

localize('tw', zhTW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter('money', money);

const toastrConfig = {
  defaultTimeout: 3000,
  defaultPosition: 'toast-bottom-right',
  defaultStyle: { 'font-family': '"Microsoft JhengHei", Arial, Verdana, sans-serif' },
};

Vue.use(Toastr, toastrConfig);
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
