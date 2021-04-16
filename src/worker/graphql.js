export function resolveGraphqlPath(graphqlPath, keys) {
  const graphqlsMap = keys.map((graphql) => {
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

  if (!graphqlsMap.length) return null

  /**
   * First, try to find an exact match.
   */
  let graphql = graphqlsMap.find(
    (p) => graphqlPath === `/graphql${p.graphqlPath}`,
  )
  if (!graphql) {
    /**
     * Sort pages to include those with `index` in the name first, because
     * we need those to get matched more greedily than their dynamic counterparts.
     */
    graphqlsMap.sort((a) => (a.graphql.includes('schema') ? -1 : 1))

    graphql = graphqlsMap.find((p) => p.test.test(graphqlPath))
  }

  /**
   * If an exact match couldn't be found, try giving it another shot with /index at
   * the end. This helps discover dynamic nested schema pages.
   */
  if (!graphql) {
    graphql = graphqlsMap.find((p) => p.test.test(graphqlPath + '/schema'))
  }

  if (!graphql) {
    console.log('I am wrong')
    return null
  }

  return graphql
}

export function getGraphql(graphqlPath, context) {
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

export async function executeGQL(gqlNode, variables = {}) {
  try {
    //let response = await getFromCache(cache, updatedAST)
    //if (!response || !response.data) {
    const result = await fetch('https://api.spacex.land/graphql', {
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
    logger.error(error)
  }
}

export class GraphQLNotFound extends Error {}
