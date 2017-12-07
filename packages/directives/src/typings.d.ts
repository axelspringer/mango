/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types
 */

// support NodeJS modules without type definitions
declare module '*'

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var System: SystemJS
declare var __PROD__: boolean
declare var __DEV__: boolean

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apolloProvider?: any;
  }
}

// Window
interface Window {
  Promise: any
  Vue: any
}

interface SystemJS {
  import: (path?: string) => Promise<any>
}
