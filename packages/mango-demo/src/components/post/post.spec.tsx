import Vue from 'vue'
import { Home } from '../home';
import { mount } from 'avoriaz'
import Vuex from 'vuex';
import PageManager from '@axelspringer/mango-plugin-pagemanager'

// inject mango
Vue.use(PageManager)
Vue.use(Vuex)

describe('Home', () => {
  let getters
  let store
  let pagemanager
  beforeEach(() => {
    getters = {
      message: () => 'bye!'
    }
    store = new Vuex.Store({
      getters
    })
    pagemanager = new PageManager({
      blocks: [

      ]
    })
  })


  it('renders the correct message', () => {
    const wrapper = mount(Home, { store, pagemanager })
    const div = wrapper.find('div')[0]
    expect(div.text()).toBe('bye!')
  })
})
