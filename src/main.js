import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie';
import vSelect from 'vue-select'
import VueUploadComponent from 'vue-upload-component';
import VModal from 'vue-js-modal'

import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
import Api from "@/plugins/axios";
import Loading from "@/plugins/loading";
import VueMoment from "vue-moment";
import "@/plugins/editor";

const moment = require('moment')
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(VueCookie);
Vue.use(VModal);

Vue.use(Vuelidate)

Vue.use(Loading, store)
Vue.use(Api, store)

import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

Vue.component('file-upload', VueUploadComponent)
require('moment/locale/ru')



Vue.use(VueMoment, {
  moment
});

Vue.prototype.$log = console.log.bind(console)

const init = async () => {
  await store.dispatch('init')
  new Vue({
    el: '#app',
    router,
    store,
    icons,
    template: '<App/>',
    components: {
      App
    }
  })
}

init()