import { combineReducers } from 'redux';

import apis, * as fromApis from './apis';
import plugins, * as fromPlugins from './plugins';
import timepicker, * as fromTimepicker from './timepicker';

export default combineReducers({
  apis,
  plugins,
  timepicker
});

export const getPlugins = state =>
  fromPlugins.getAll(state.plugins)

export const getApplication = (state, pluginId, appId) =>
  fromPlugins.getApplication(state.plugins, pluginId, appId);

export const getApis = state =>
  fromApis.getAll(state.apis)

export const getServices = state =>
  fromPlugins.getServices(state.plugins)

export const getTimepickerRefreshInterval = state =>
  fromTimepicker.getRefreshInterval(state.timepicker);
