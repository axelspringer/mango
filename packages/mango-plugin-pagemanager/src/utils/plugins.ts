export function registerComponent(Vue, name, def) {
  Vue._bootstrap_vue_components_ = Vue._bootstrap_vue_components_ || {}
  const loaded = Vue._bootstrap_vue_components_[name]
  if (!loaded && def && name) {
    Vue._bootstrap_vue_components_[name] = true
    Vue.component(name, def)
  }
  return loaded
}

export function registerComponents(Vue, components) {
  for (let component in components) {
    registerComponent(Vue, component, components[component])
  }
}
