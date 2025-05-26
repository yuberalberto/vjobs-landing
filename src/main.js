import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Check if it's a page refresh and there's a hash
if (window.performance && performance.navigation.type === 1 && window.location.hash) {
  // Redirect to home without hash
  window.location.href = window.location.origin
} else {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}