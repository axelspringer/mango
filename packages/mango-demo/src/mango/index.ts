import Vue from 'vue'
import PageManager from '@axelspringer/mango-plugin-pagemanager'
import Mango from '@axelspringer/mango-vue'
import { SelectedArticles } from '../components/selectedArticles'

// inject mango
Vue.use(PageManager)
Vue.use(Mango)

export const pagemanager = new PageManager({
  blocks: [
    {
      pageBlock: 'selected_articles',
      component: SelectedArticles
    }
  ]
})

export const mango = new Mango({})
