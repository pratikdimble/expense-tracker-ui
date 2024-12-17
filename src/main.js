import './assets/main.css'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification';  // Import Vue Toastification
import 'vue-toastification/dist/index.css';  // Import the Toast styles

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {
    position: POSITION.TOP_RIGHT,  // Position of the toast notifications
    timeout: 1200,  // How long the toast stays visible
  });   

app.mount('#app')
