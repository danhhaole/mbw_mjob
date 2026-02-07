import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryOptions } from './plugins/queryClient'

let app = createApp(App)
const pinia = createPinia()

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(VueQueryPlugin, vueQueryOptions)
app.use(pinia)

app.component('Button', Button)
if (import.meta.env.DEV) {
    frappeRequest({ url: '/api/method/mbw_mjob.www.jdstore.get_context_for_dev' }).then(
      (values) => {
        for (let key in values) {
          window[key] = values[key]
        }
        app.mount('#app')
      },
    )
  } else {
    app.mount('#app')
  }
