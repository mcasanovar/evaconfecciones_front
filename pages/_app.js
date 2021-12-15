import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'

const AppMain = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default AppMain