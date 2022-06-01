import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ConnectONT from '../views/ConnectONT.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router