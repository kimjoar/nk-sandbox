import { find } from 'lodash'

export default (plugins = {}, action) => {
  return plugins
}

export const getAll = state => state;
export const getApplication = (state, pluginId, appId) =>
  find(state[pluginId].apps, { id: appId })
