import { handleEvent } from './workers'

addEventListener('fetch', async (event: FetchEvent) => {
  try {
    event.respondWith(
      handleEvent(
        event,
        require.context('./graphql/', true, /\.(js|ts|graphql)$/),
      ),
    )
  } catch (e) {
    console.log(e)
    event.respondWith(
      new Response('Internal Error', {
        status: 501,
      }),
    )
  }
})
