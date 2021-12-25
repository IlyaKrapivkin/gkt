import { GraphQLError } from 'graphql'

export const ErrorFormatter = (
  err: GraphQLError,
): GraphQLError => {
  console.error(err)
  const errorReplaced: GraphQLError = {
    message: err.message,
    nodes: undefined,
    source: undefined,
    positions: undefined,
    path: undefined,
    originalError: undefined,
    extensions: undefined,
    locations: undefined,
    name: undefined,
  }
  return errorReplaced
}