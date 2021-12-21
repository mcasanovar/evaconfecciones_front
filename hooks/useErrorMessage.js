import { useState } from 'react'

const useErrorMessage = (message) => {
  const [errorMessage, setErrorMessage] = useState(message)

  const cleanErrorMessage = () => {
    setErrorMessage({show: false, message: ''})
  }

  const createMessage = (newMessage) => {
    setErrorMessage({...newMessage})
  }

  return [
    errorMessage,
    cleanErrorMessage,
    createMessage
  ]
}

export default useErrorMessage