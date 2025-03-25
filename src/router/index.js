import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import BlogPost from '../views/BlogPost.vue'
import Sites from '../views/Sites.vue'
import BlogList from '../views/BlogList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: BlogList
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPost
    },
    {
      path: '/sites',
      name: 'sites',
      component: Sites
    }
  ]
})

export default router 