import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index';
import globalComponent from "@/components/index";
import "@/style/index.scss";
import pinia from "@/stores/index";

const app = createApp(App)

app.use(globalComponent);

app.use(pinia)
app.use(router)

app.mount('#app')