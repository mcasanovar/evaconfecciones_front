import { useState } from 'react'

const useLoading = (initialState) => {
  const [loading, setLoading] = useState(initialState)

  const toggleLoading = (state) => setLoading(state)

  return [
    loading,
    toggleLoading
  ]
}

export default useLoading
