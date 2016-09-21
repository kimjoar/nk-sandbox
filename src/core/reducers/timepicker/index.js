import { SET_REFRESH_INTEVAL } from '../../actions/timepicker';

const initialState = {
  refreshInterval: 10
};

export default function timepickerReducer(timepicker = initialState, action) {
  if (action.type === SET_REFRESH_INTEVAL) {
    return {
      ...timepicker,
      refreshInterval: action.payload
    }
  }
  return timepicker;
}

export const getRefreshInterval = state => state.refreshInterval;
