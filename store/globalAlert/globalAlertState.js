import { useReducer } from 'react'
import GlobalAlertContext from './globalAlertContext'
import GlobalAlertReducer from './globalAlertReducer'
import { 
  SHOW_GLOBAL_ALERT,
  CLEAN_GLOBAL_ALERT
} from '../types'

const GlobalAlertState = ({children}) => {

  const initialState = {
    showAlert: false,
    textResult: '',
    descriptionResult: ''
  }

  const [state, dispatch] = useReducer(GlobalAlertReducer, initialState)

  //functions
  const showGlobalAlert = result => {
    dispatch({
      type: SHOW_GLOBAL_ALERT,
      payload: {
        ...result,
        showAlert: true
      }
    })
  }

  const cleanGlobalAlert = () => {
    dispatch({
      type: CLEAN_GLOBAL_ALERT,
      payload: {
        showAlert: false,
        textResult: '',
        descriptionResult: ''
      }
    })
  }

  return (
    <GlobalAlertContext.Provider value={{
      showAlert: state.showAlert,
      textResult: state.textResult,
      descriptionResult: state.descriptionResult,
      showGlobalAlert,
      cleanGlobalAlert
    }}>
      {children}
    </GlobalAlertContext.Provider>
  )
}

export default GlobalAlertState