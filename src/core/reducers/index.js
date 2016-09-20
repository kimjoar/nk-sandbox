import { combineReducers } from 'redux'

import applications, * as fromApplications from './applications'
import timepicker, * as fromTimepicker from './timepicker'

export default combineReducers({
  applications,
  timepicker
})

export const getApplications = state =>
  fromApplications.getAll(state.applications)

export const getApplication = (state, appId) =>
  fromApplications.get(state.applications, appId)

export const getTimepickerRefreshInterval = state =>
  fromTimepicker.getRefreshInterval(state.timepicker)
