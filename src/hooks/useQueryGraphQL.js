import { useQuery } from '@apollo/client'

const useQueryGraphQL = (query, options = {}) => {
  const { data, error, loading } = useQuery(query, {...options})
  return {
    data,
    error,
    loading
  }
}

export default useQueryGraphQL