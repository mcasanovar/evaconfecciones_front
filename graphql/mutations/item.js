import { gql } from '@apollo/client'

const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!){
    createItem(input: $input){
      _id
      collage
      clothes
      size
      price
      createAt
    }
  }
`

const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!){
    deleteItem(id: $id)
  }
`

export { CREATE_ITEM, DELETE_ITEM }