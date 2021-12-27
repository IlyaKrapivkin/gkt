import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types'

export const ResponseFormatter = (
  response: GraphQLResponse,
  requestContext: GraphQLRequestContext,
): GraphQLResponse => {
  const responseNew: GraphQLResponse = {
    data: requestContext?.response?.data || null,
    errors: requestContext?.response?.errors || [],
  }
  return responseNew
}