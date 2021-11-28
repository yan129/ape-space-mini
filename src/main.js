import Vue from 'vue'
import App from './App'
import wybButton from '@/components/wyb-button/wyb-button.vue'
import splitLine from '@/components/split-line/split-line.vue'
import $http from '../src/static/request/requestConfig'
import commonJs from './static/js/common.js'
import store from './static/js/store.js'

// Vue.use(commonJs)
Vue.component('wyb-button', wybButton)
Vue.component('split-line', splitLine)

Vue.prototype.$store = store
Vue.prototype.$commonJs = commonJs
Vue.prototype.$http = $http;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
