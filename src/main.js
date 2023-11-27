import { createApp } from 'vue'
import App from './App.vue'
import routers from './routers/router' 

// createApp(App).mount('#app')
const app = createApp(App)
app.use(routers)  // router 추가
app.mount('#app')