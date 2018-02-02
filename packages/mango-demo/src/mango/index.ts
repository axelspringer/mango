import Vue from 'vue'
import Mango from '@axelspringer/mango-vue'
import { SelectedArticles } from '../components/selectedArticles'

// inject mango
Vue.use(Mango)

export default new Mango({
  pagemanager: [
    {
      pageBlock: 'selected_articles',
      component: SelectedArticles
    }
  ]
})
