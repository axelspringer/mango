import inBrowser from '../../utils/dom'

function getTags(vm) {
  const { tags } = vm
  console.log(tags)
  if (tags) {
    return typeof tags === 'function'
      ? tags.call(vm)
      : tags
  }
}

const serverTagsMixin = {
  created() {
    const tags = getTags(this)
    if (tags) {
      this.$ssrContext.tags = createTags(tags)
    }
  }
}

/**
 * Creates tags from an array of tag names and attribute maps
 *
 * @param tags
 */
function createTags(tags) {
  return Object.getOwnPropertyNames(tags)
    .map(name => {
      if (Array.isArray(tags[name])) {
        return tags[name].map(attrs => createTag(name, attrs))
      }
    })
    .reduce((arr, curr) => {
      return arr.concat(curr)
    }, [])
    .join('\n\t')
}

/**
 * Creates a head tag from a tag name and an attribute map
 *
 * @param tagName
 * @param attrMap
 */
function createTag(tagName, attrMap) {
  const attributes = Object.getOwnPropertyNames(attrMap)
    .filter((name) => name[0] !== '=')
    .map(name => `${name}="${attrMap[name]}"`)

  const closingTag = tagName === 'script' ? '</script>' : ''

  return `<${tagName} ${attributes.join(' ')}>${closingTag}`
}

export default !inBrowser || process.env.VUE_ENV === 'server'
  ? serverTagsMixin
  : {} // nothing to see on the client
