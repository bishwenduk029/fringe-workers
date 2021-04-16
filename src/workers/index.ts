import { handleRequest } from './handler'

export async function handleEvent(event: FetchEvent, context: any) {
  return handleRequest(event, context)
}
