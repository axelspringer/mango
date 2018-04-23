export const loadPlugin = plugin => {
  if (process.env.NODE_ENV !== 'development') {
    const { main } = require(`../../../mango-plugin-${plugin}/package.json`)
    return require(`../../../mango-plugin-${plugin}/${main}`)
  }

  const Repository = require('lerna/lib/Repository')
  const PackageUtilities = require('lerna/lib/PackageUtilities')

  const repo = new Repository()
  const loadedPackages = PackageUtilities.getPackages({
    rootPath: repo.rootPath,
    packageConfigs: [
      `${repo.rootPath}/node_modules/@axelspringer/mango-plugin-${plugin}`,
      `packages/mango-plugin-${plugin}`
    ]
  })

  if (!loadedPackages.length) {
    throw new Error(`Requested plugin ${plugin} not found`)
  }

  const pack = loadedPackages[0];

  return require(`${pack.location}/${pack.toJSON().main}`)
}
