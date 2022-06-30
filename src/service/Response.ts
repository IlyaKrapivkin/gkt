import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types'

export const ResponseFormatter = (
  response: GraphQLResponse,
  requestContext: GraphQLRequestContext,
): GraphQLResponse => {
  const responseNew: GraphQLResponse = {
    data: (response.data === undefined) ? null : response.data,
    errors: response?.errors || [],
  }
  return responseNew
}