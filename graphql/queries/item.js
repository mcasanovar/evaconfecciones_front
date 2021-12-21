import { gql } from '@apollo/client'

const GET_ITEMS = gql`
  query getAllItems {
    getAllItems {
      _id
      collage
      clothes
      size
      price
    }
  }
`

export { GET_ITEMS }