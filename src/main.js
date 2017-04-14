// Vue
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueEvents from 'vue-events'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'


// Global Style
import './css/style.css'
import './css/muse-custom.css'

import App from './App.vue'
Vue.use(VueResource);
Vue.use(VueEvents);
Vue.use(MuseUI);
Vue.config.debug = true;

new Vue(App);