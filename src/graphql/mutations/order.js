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

const UPDATE_ORDER = gql`
  mutation updateOrder($input: UpdateOrderInput!){
    updateOrder(input: $input){
      _id
      updatedAt
      code
    }
  }
`

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!){
    deleteOrder(id: $id)
  }
`

export { CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER }