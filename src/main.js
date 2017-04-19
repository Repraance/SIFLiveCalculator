// Vue
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueEvents from 'vue-events'

import touchRipple from 'muse-components/internal/touchRipple'
import checkbox from 'muse-components/checkbox'
import radio from 'muse-components/radio'
import muSwitch from 'muse-components/switch'
import App from './App.vue'

// Global Style
import './css/style.css'
import './css/muse-custom.css'
Vue.use(VueResource);
Vue.use(VueEvents);
Vue.config.debug = true;

Vue.component(checkbox.name, checkbox);
Vue.component(radio.name, radio);
Vue.component(muSwitch.name, muSwitch);
new Vue(App);