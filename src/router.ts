import { createRouter, createWebHistory } from 'vue-router'
import AddUser from './views/New.vue'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import UserDetail from './views/UserDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: '/usuarios', component: Home },
    { path: '/usuarios/nuevo', component: AddUser },
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path:'/usuarios/:id',component: UserDetail}
  ]
})
