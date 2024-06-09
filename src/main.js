import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';

createApp(App).use(store).use(router).use(ToastService).mount('#app');
