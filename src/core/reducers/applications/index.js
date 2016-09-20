export default function applicationsReducer(applications = {}, action) {
  return applications
}

export const getAll = state => state
export const get = (state, appId) => state[appId]
