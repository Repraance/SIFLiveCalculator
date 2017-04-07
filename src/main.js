// Vue
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueEvents from 'vue-events'

// Global Style
import './css/style.css'

import App from './App.vue'
Vue.use(VueResource);
Vue.use(VueEvents);
Vue.config.debug = true;

new Vue(App);