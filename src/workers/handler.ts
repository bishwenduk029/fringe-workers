import { Cache } from '../cache'
import { executeGQL, getGraphql } from './graphql'

export async function handleRequest(event: FetchEvent, context: any) {
  try {
    const request = event.request

    const url = new URL(request.url)
    const { pathname } = url

    const requestBody = await request.json()

    const normalizedPathname = normalizePathname(pathname)

    if (pageIsGraphql(normalizedPathname)) {
      const page = getGraphql(normalizedPathname, context)
      const response: string = await executeGQL(page, requestBody)

      return new Response(JSON.stringify(response), {
        headers: {
          'content-type': 'application/json',
        },
      })
    }
    return new Response('Sorry Invalid Request')
  } catch (error) {
    console.log(error)
    return new Response(error)
  }
}

function pageIsGraphql(page: string) {
  return /^\/graphql\/.+/.test(page)
}

function normalizePathname(pathname: string) {
  return pathname === '/' || /graphql$/.test(pathname) ? '/index' : pathname
}
