/**
 * Standard tags
 */
export const defaultAttrs = ['http-equiv', 'charset']
export const defaultValues = ['viewport']

/**
 * Create meta tags
 */
export function createMetaTags(metas) {
  metas.map(meta => {
    const el = document.createElement('meta')
    Object.getOwnPropertyNames(meta)
      .forEach(attr => {
        const prop = document.createAttribute(attr)
        prop.value = meta[attr]
        el.setAttributeNode(prop)
      })
    document.getElementsByTagName('head')[0].appendChild(el)
  })
}

/**
 * Remove tags
 */
export function removeMetaTags() {
  const el = document.getElementsByTagName('meta')
  let i = el.length
  while (i--) {
    let remove = true // because we do not solve this functional
    for (let j = 0; j < el[i].attributes.length; j++) {
      const attr = el[i].attributes.item(j)
      if (defaultAttrs.indexOf(attr.name) !== -1 ||
        (attr.name === 'name' && defaultValues.indexOf(attr.value) !== -1)) {
        remove = false
      }
    }

    if (!remove) {
      continue // noop
    }

    el[i].remove()
  }
}
