import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!){
    createOrder(input: $input){
      _id
      code
    }
  }
`

export { CREATE_ORDER }