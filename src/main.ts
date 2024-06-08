import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/index.less'
// import 'element-plus/theme-chalk/el-message.css'

import registerIcons from './global/register-icons'
const app = createApp(App)

app.use(createPinia())
app.use(registerIcons)
app.use(router)

app.mount('#app')
