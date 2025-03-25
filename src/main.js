import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css'
import './styles/tailwind.css'

// 导入 Tailwind CSS
import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
