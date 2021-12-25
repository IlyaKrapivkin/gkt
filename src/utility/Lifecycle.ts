import { GraphQLResponse } from 'apollo-server-types'

export const Lifecycle = {
  async requestDidStart(requestContext) {
    return {
      async didResolveOperation (context) {
      },
      async didEncounterErrors (context) {
        console.log('🕷️')
      },
      async willSendResponse (context) {
        const responseReplaced: GraphQLResponse = {
          data: context.response.data || null,
          errors: context.response.errors || [],
        }
        context.response = responseReplaced
      }
    }
  }
}