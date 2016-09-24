function apiReducer(api = {}, action) {
  if (action.type === 'REGISTER_API') {
    return action.payload
  }

  return api
}

export default (apis = {}, action) => {
  if (action.type === 'REGISTER_API') {
    const { id } = action.meta

    return {
      ...apis,
      [id]: apiReducer(apis[id], action)
    }
  }

  return apis
}

export const getAll = state => state
