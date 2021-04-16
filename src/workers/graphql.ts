import { DocumentNode } from 'graphql'
import { Cache } from '../cache'

export function resolveGraphqlPath(graphqlPath: string, keys: [string]) {
  const graphQlMap = keys.map((graphql) => {
    let test = graphql

    test = test
      .replace('/', '\\/')
      .replace(/^\./, '')
      .replace(/\.(graphql)$/, '')

    return {
      graphql,
      graphqlPath: graphql.replace(/^\./, '').replace(/\.(graphql)$/, ''),
      test: new RegExp('^' + test + '$', ''),
    }
  })

  /**
   * Quite possible there is no Graphql file. In which case return null
   */

  if (!graphQlMap.length) return null

  /**
   * First, try to find an exact match.
   */
  let graphql = graphQlMap.find(
    (p) => graphqlPath === `/graphql${p.graphqlPath}`,
  )
  if (!graphql) {
    /**
     * Sort pages to include those with `index` in the name first, because
     * we need those to get matched more greedily than their dynamic counterparts.
     */
    graphQlMap.sort((a) => (a.graphql.includes('index') ? -1 : 1))

    graphql = graphQlMap.find((p) => p.test.test(graphqlPath))
  }

  /**
   * If an exact match couldn't be found, try giving it another shot with /index at
   * the end. This helps discover dynamic nested schema pages.
   */
  if (!graphql) {
    graphql = graphQlMap.find((p) => p.test.test(graphqlPath + '/index'))
  }

  if (!graphql) {
    return null
  }

  return graphql
}

export function getGraphql(graphqlPath: string, context: any) {
  try {
    const resolvedGraphqlFile = resolveGraphqlPath(graphqlPath, context.keys())
    if (resolvedGraphqlFile) {
      const graphqlContent = context(resolvedGraphqlFile.graphql)
      return graphqlContent
    }
  } catch (e) {
    console.log(e)
  }
  return null
}

export async function executeGQL(gqlNode: DocumentNode, variables = {}) {
  try {
    //let response = await getFromCache(cache, updatedAST)
    //if (!response || !response.data) {
    const result = await fetch(GRAPHQL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: gqlNode.loc.source.body,
        variables,
      }),
    })
    const response = await result.json()
    //   const getKey = (obj) =>
    //     `${obj.__typename}:${cacheFields
    //       .map((cacheField) => obj[cacheField])
    //       .join(':')}`
    //   const normMap = normalize(updatedAST, undefined, response.data, getKey)
    //   await merge(cache, normMap)
    // }
    return JSON.stringify(response.data)
  } catch (error) {
    console.log(error)
    return JSON.stringify(error)
  }
}

export class GraphQLNotFound extends Error {}
