import Vue from 'vue'
import Router from 'vue-router'
// import { Home } from '../components/home'
import { Post } from '../components/post'
import MangoRouter from '@axelspringer/mango-router'
import { Home } from '../components/home'

const permalinks = new MangoRouter() // build the route
  .home(Home)
  .post(Post)

Vue.use(MangoRouter)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: permalinks.all()
})
