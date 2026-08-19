import { createApp } from 'vue'
import router from '@app/router'
import App from '@app/App.vue'

import '@app/resource/style/style.scss'
import VueDlgInstall from '@example/install/index'

const VueApp = createApp(App)

VueApp.use(router)
VueApp.use(VueDlgInstall)

VueApp.mount('#app')
