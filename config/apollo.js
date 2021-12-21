import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'
//vars
import { URI_GRAPHQL } from '../constant/var'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: URI_GRAPHQL,
    fetch
  })
});

export default client