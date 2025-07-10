export async function onRequest(context) {
  const request = context.request;
  const targetUrl = 'https://8080-01jzq0t2fr8bnfrp35xht4gs9g.cloudspaces.litng.ai';
  
  const url = new URL(request.url);
  const newUrl = targetUrl + url.pathname + url.search;
  
  const newHeaders = new Headers(request.headers);
  newHeaders.set('Host', '8080-01jzq0t2fr8bnfrp35xht4gs9g.cloudspaces.litng.ai');
  newHeaders.delete('cf-connecting-ip');
  newHeaders.delete('cf-ray');
  
  const response = await fetch(newUrl, {
    method: request.method,
    headers: newHeaders,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
  });
  
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  
  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}
