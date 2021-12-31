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

export { GET_ORDERS }