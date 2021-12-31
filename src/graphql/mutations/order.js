import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!){
    createOrder(input: $input){
      _id
      createAt
      updatedAt
      code
      clientName
      phone
      subTotal
      previewPayment
      balance
      details {
        _id,
        completed
      }
      state
      percentage
    }
  }
`

export { CREATE_ORDER }