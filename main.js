import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import eImg from './components/img/index'
App.mpType = 'app'

Vue.component('eImg', eImg);
const app = new Vue({
    ...App
})
app.$mount()
