import { gql } from '@apollo/client'

const GET_ORDERS = gql`
  query getOrders ($year: String) {
    getOrders (year: $year) {
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

const GET_ORDER_BY_ID = gql`
  query getOrderById($id: ID!){
    getOrderById(id: $id){
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
        collage
        clothes
        size
        uniquePrice
        quantity
        total
      }
      state
      comments
      percentage
    }
  }
`

export { GET_ORDERS, GET_ORDER_BY_ID }