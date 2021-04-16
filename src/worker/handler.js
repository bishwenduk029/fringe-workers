import { executeGQL, getGraphql } from './graphql'

export async function handleRequest(event, context, fallback) {
  const url = new URL(event.request.url)
  const { pathname, searchParams } = url
  const query = Object.fromEntries(searchParams.entries())

  try {
    const normalizedPathname = normalizePathname(pathname)

    if (pageIsGraphql(normalizedPathname)) {
      const page = getGraphql(normalizedPathname, context)
      const response = await executeGQL(page, query)

      if (response instanceof Object && !(response instanceof Response)) {
        return new Response(JSON.stringify(response), {
          headers: {
            'content-type': 'application/json',
          },
        })
      }

      if (!(response instanceof Response)) {
        return new Response(response)
      }

      return response
    }
  } catch (error) {
    console.log(error)
  }
}

function pageIsGraphql(page) {
  return /^\/graphql\/.+/.test(page)
}

function normalizePathname(pathname) {
  return pathname === '/' || /graphql$/.test(pathname) ? '/index' : pathname
}
