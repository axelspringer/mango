import Vue from 'vue'
import Router from 'vue-router'
import { Home } from '../components/home'
import { Post } from '../components/post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:category/:post',
      component: Post
    }
  ]
})
