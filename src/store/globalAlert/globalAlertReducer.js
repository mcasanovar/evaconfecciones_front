import {
  SHOW_GLOBAL_ALERT,
  CLEAN_GLOBAL_ALERT
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SHOW_GLOBAL_ALERT:
      return {
        ...state,
        ...action.payload
      }
    case CLEAN_GLOBAL_ALERT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}