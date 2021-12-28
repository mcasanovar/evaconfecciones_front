import { useReducer } from 'react'
import ConfigDataContext from './configDataContext'
import ConfigDataReducer from './configDataReducer'
import { 
  SET_CONFIG_DATA,
  CLEAN_CONFIG_DATA
} from '../types'

const ConfigDataState = ({children}) => {

  const initialState = {
    collages: [],
    selectedCollage: "",
    selectedClothes: "",
    selectedSize: "",
    clothes: [],
    sizes: [],
    items: []
  }

  const [state, dispatch] = useReducer(ConfigDataReducer, initialState)

  //functions
  const setConfigData = (newData, selection) => {
    dispatch({
      type: SET_CONFIG_DATA,
      payload: {
        data: newData,
        selection
      }
    })
  }

  const cleanConfigData = () => {
    dispatch({
      type: CLEAN_CONFIG_DATA
    })
  }

  return (
    <ConfigDataContext.Provider value={{
      collages: state.collages,
      clothes: state.clothes,
      sizes: state.sizes,
      items: state.items,
      selectedCollage: state.selectedCollage,
      selectedClothes: state.selectedClothes,
      selectedSize: state.selectedSize,
      setConfigData,
      cleanConfigData
    }}>
      {children}
    </ConfigDataContext.Provider>
  )
}

export default ConfigDataState