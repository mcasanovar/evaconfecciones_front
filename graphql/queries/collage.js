import { gql } from '@apollo/client'

const GET_COLLAGES = gql`
  query getAllCollages {
    getAllCollages {
      _id
      name
    }
  }
`

export { GET_COLLAGES }
