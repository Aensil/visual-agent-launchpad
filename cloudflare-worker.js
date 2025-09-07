addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Redirect vuen.org to vuen.ai
  if (url.hostname === 'vuen.org' || url.hostname === 'www.vuen.org') {
    const newUrl = `https://vuen.ai${url.pathname}${url.search}`
    return Response.redirect(newUrl, 301)
  }
  
  // Continue to origin for vuen.ai
  return fetch(request)
}