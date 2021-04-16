import { handleRequest } from './handler'

export async function handleEvent(event, context, DEBUG) {
  return await handleRequest(event, context, async () => {})
}
