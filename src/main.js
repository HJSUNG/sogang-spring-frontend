import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";

import 'primevue/resources/themes/saga-blue/theme.css'; // 테마 CSS 파일
import 'primevue/resources/primevue.min.css'; // PrimeVue 기본 CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import 'primeflex/primeflex.css'; // PrimeFlex

createApp(App).use(store).use(router).use(PrimeVue).use(ToastService).component("Toast", Toast).mount('#app');
