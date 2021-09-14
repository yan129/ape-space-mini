import Vue from 'vue'
import App from './App'
import wybButton from '@/components/wyb-button/wyb-button.vue'
import splitLine from '@/components/split-line/split-line.vue'

Vue.component('wyb-button', wybButton)
Vue.component('split-line', splitLine)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
