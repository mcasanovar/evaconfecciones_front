import { useQuery } from '@apollo/client'

export const useQueryGraphQL = (query) => {
  const { data, error, loading } = useQuery(query)
  return {
    data,
    error,
    loading
  }
}