import { gql } from '@apollo/client'

const CREATE_COLLAGE = gql`
  mutation createCollage($input: CreateCollageInput!){
    createCollage(input: $input){
      _id
      name
    }
  }
`

export { CREATE_COLLAGE }