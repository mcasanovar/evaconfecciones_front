import {
  SET_CONFIG_DATA,
  CLEAN_CONFIG_DATA
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SET_CONFIG_DATA:
      return {
        ...state,
        [action.payload.selection]: action.payload.data
      }
    case CLEAN_CONFIG_DATA:
      return {
        ...state,
        selectedCollage: "",
        selectedClothes: "",
        selectedSize: "",
      }
    default:
      return state
  }
}