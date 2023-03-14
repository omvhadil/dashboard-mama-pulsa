import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "remixicon/fonts/remixicon.css";
import Vue3ProgressBar from "@dzunn86/vue3-progress";
import './assets/main.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3ProgressBar)

app.mount('#app')
