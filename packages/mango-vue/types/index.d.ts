import Vue, { PluginFunction } from 'vue'

declare namespace VueMango {
  enum MangoMode {
    Browser = 'Browser',
    Server = 'Server'
  }

  interface MangoOptions {
    mode?: MangoMode
  }
}

declare class VueMango {
  constructor(options?: VueMango.MangoOptions)

  static install: PluginFunction<never>
  static version: string
}

export default VueMango
