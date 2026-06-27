import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 確保你有這個 router 資料夾

const app = createApp(App)

app.use(router) // 啟用路由
app.mount('#app') // 這行一定要有，對應 index.html 的 <div id="app"></div>