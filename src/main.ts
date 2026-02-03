import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faEye, faHome } from '@fortawesome/free-solid-svg-icons'

library.add(faXmark, faEye, faHome)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')
