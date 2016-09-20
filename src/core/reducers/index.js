import { combineReducers } from 'redux'

import applications, * as fromApplications from './applications'

export default combineReducers({
  applications
})

export const getApplications = state =>
  fromApplications.getAll(state.applications)

export const getApplication = (state, appId) =>
  fromApplications.get(state.applications, appId)
