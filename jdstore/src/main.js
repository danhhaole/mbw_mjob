import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryOptions } from './plugins/queryClient'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(VueQueryPlugin, vueQueryOptions)

app.component('Button', Button)
app.mount('#app')
