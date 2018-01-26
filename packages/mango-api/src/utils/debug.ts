export const formatError = (error) => ({
  message: error.message,
  locations: error.locations,
  stack: error.stack,
  path: error.path
})
