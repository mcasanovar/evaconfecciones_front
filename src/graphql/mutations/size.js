import { gql } from '@apollo/client'

const CREATE_SIZE = gql`
  mutation createSize($input: CreateSizeInput!){
    createSize(input: $input){
      _id
      name
    }
}
`

const DELETE_SIZE = gql`
  mutation deleteSize($id: ID!){
    deleteSize(id: $id)
  }
`

export { CREATE_SIZE, DELETE_SIZE }