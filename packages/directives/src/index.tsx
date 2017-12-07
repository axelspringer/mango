import Provider from './provider'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  functional: true // functional component
} as any) // interfacing
export default class Mango extends Vue {

  constructor() {
    super()
  }

  public render(h, { children, props }) {
    return h(Provider, { props }, children)
  }

}
