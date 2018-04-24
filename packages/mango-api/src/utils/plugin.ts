const Repository = require('lerna/lib/Repository')
const PackageUtilities = require('lerna/lib/PackageUtilities')

export const loadPlugin = plugin => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    try {
      // try require globally installed module
      const { main } = require(`@axelspringer/mango-plugin-${plugin}/package.json`)
      return require(`@axelspringer/mango-plugin-${plugin}/${main}`)
    } catch (e) {
      throw new Error(`Requested plugin ${plugin} not found. Is it installed globally?`)
    }
  }

  const repo = new Repository()
  const loadedPackages = PackageUtilities.getPackages({
    rootPath: repo.rootPath,
    packageConfigs: [
      `${repo.rootPath}/node_modules/@axelspringer/mango-plugin-${plugin}`,
      `packages/mango-plugin-${plugin}`
    ]
  })

  if (!loadedPackages.length) {
    throw new Error(`Requested plugin ${plugin} not found.`)
  }

  const pack = loadedPackages[0];

  return require(`${pack.location}/${pack.toJSON().main}`)
}
