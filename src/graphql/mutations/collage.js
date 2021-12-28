import { gql } from '@apollo/client'

const CREATE_COLLAGE = gql`
  mutation createCollage($input: CreateCollageInput!){
    createCollage(input: $input){
      _id
      name
    }
  }
`

const DELETE_COLLAGE = gql`
  mutation deleteCollage($id: ID!){
    deleteCollage(id: $id)
  }
`

export { CREATE_COLLAGE, DELETE_COLLAGE }