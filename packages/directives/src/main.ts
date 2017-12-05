import Vue from 'vue'
import Vuepress from './index'

// register
Vue.use(Vuepress)

Vue.component('my-posts', {
  template: [
    '<div>',
    '<vuepress-posts></vuepress-posts>',
    '</div>'
  ].join(''),
  props: {
  },
  methods: {
  },
})

const vm = new Vue({
  el: '#app',
})
