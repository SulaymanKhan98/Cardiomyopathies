import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import about from '../views/About.vue'
import Graph from '../views/Graph.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/about',
    name: 'About',
    component: about
  },

  {
    path: '/graph',
    name: 'graph',
    component: Graph
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
