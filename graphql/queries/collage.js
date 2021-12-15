import { gql } from '@apollo/client'

const GET_COLLAGES = gql`
  query getAllCollages {
    getAllCollages {
      _id
      isDeleted
      name
    }
  }
`

export { GET_COLLAGES }
