import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const APP = createApp(App);

APP
  .use(store)
  .use(router)
  .mount('#app')
