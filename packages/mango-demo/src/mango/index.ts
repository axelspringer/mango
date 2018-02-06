import Vue from 'vue'
import PageManager from '@axelspringer/mango-plugin-pagemanager'
import { SelectedArticles } from '../components/selectedArticles'

// inject mango
Vue.use(PageManager)

export default new PageManager({
  blocks: [
    {
      pageBlock: 'selected_articles',
      component: SelectedArticles
    }
  ]
})
