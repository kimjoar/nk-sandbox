function apiReducer(api = {}, action) {
  if (action.type === 'REGISTER_API') {
    return action.payload
  }

  return api
}

export default (apis = {}, action) => {
  if (action.type === 'REGISTER_API') {
    const { pluginId, appId } = action.meta
    const id = `${pluginId}/${appId}`

    return {
      ...apis,
      [id]: apiReducer(apis[id], action)
    }
  }

  return apis
}
