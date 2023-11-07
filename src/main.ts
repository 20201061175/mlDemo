import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ECharts from 'vue-echarts';
import 'echarts';

createApp(App)
.use(router)
.component('ECharts', ECharts)
.mount('#app')
