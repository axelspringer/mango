import Vue from 'vue'
import Router from 'vue-router'
// import { Home } from '../components/home'
import { Post } from '../components/post'
import MangoRouter, { RouterPlugin } from '@axelspringer/mango-router'
import { Home } from '../components/home'

MangoRouter // build the route
  .home(Home)
  .post(Post)

Vue.use(RouterPlugin)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: MangoRouter.all()
})
