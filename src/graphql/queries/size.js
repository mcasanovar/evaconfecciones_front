import { gql } from '@apollo/client'

const GET_SIZES = gql`
  query getAllSizes {
    getAllSizes {
      _id
      name
    }
  }
`

export { GET_SIZES }