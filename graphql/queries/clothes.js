import { gql } from '@apollo/client'

const GET_CLOTHES = gql`
  query getAllClothes {
    getAllClothes {
      _id
      name
    }
  }
`

export { GET_CLOTHES }