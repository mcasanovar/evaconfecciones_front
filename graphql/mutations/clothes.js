import { gql } from '@apollo/client'

const CREATE_CLOTHES = gql`
  mutation createClothes($input: CreateClothesInput!){
    createClothes(input: $input){
      _id
      name
    }
  }
`

const DELETE_CLOTHES = gql`
  mutation deleteClothes($id: ID!){
    deleteClothes(id: $id)
  }
`

export { CREATE_CLOTHES, DELETE_CLOTHES }