export const SET_REFRESH_INTEVAL = 'SET_REFRESH_INTERVAL'

export const updateTimepickerRefreshInterval = newInterval => ({
  type: SET_REFRESH_INTEVAL,
  payload: newInterval
})
