import { useMutation } from '@apollo/client'

const useMutationGraphQL = (query, options = {}) => {
  const [...dataReturned] = useMutation(query, {...options})

  return [...dataReturned]
}

export default useMutationGraphQL