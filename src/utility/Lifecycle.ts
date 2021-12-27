import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types'
import { PluginDefinition } from 'apollo-server-core'

export const Lifecycle: PluginDefinition = {
  async requestDidStart(requestContext: GraphQLRequestContext) {
    return {
      async didResolveOperation (requestContext: GraphQLRequestContext) {
      },
      async didEncounterErrors (requestContext: GraphQLRequestContext) {
        console.log('🐞')
      },
      async willSendResponse (requestContext: GraphQLRequestContext) {
        const curEndDate = new Date()
      }
    }
  }
}