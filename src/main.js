import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Certifique-se de que o router está importado

createApp(App)
  .use(router) // Registra o Vue Router
  .mount('#app');