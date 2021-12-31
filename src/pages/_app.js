import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import 'animate.css'
import 'tailwindcss/tailwind.css'
//contexts
import GlobalAlertState from '../store/globalAlert/globalAlertState'
import ConfigDataState from '../store/configData/configDataState'

require('datejs')

const AppMain = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <GlobalAlertState>
        <ConfigDataState>
          <Component {...pageProps} />
        </ConfigDataState>
      </GlobalAlertState>
    </ApolloProvider>
  )
}

export default AppMain