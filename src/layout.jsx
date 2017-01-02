import React from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import config from './config'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: config.landexplorerApiUrl })
})

export default ({ children }) => {
  return (<ApolloProvider client={client}>{children}</ApolloProvider>)
}
