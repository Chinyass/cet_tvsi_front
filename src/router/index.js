import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ConnectONT from '../views/ConnectONT.vue'
import FindByUser from '../views/FindByUser'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/find-ont',
    name: 'find-ont',
    component: ConnectONT,
    props: true
  },
  {
    path: '/find-by-user',
    name: 'find-by-user',
    component: FindByUser,
    props: true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router