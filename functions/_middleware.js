export async function onRequest(context) {
  const { request } = context;
  
  // آدرس اصلی Lightning.ai
  const targetUrl = 'https://8080-01jzq0t2fr8bnfrp35xht4gs9g.cloudspaces.litng.ai';
  
  // URL درخواست رو می‌گیریم
  const url = new URL(request.url);
  
  // آدرس جدید رو می‌سازیم
  const newUrl = targetUrl + url.pathname + url.search;
  
  // هدرهای درخواست رو کپی می‌کنیم
  const newHeaders = new Headers(request.headers);
  
  // Host رو تغییر می‌دیم
  newHeaders.set('Host', new URL(targetUrl).host);
  newHeaders.set('Origin', targetUrl);
  
  // درخواست جدید می‌سازیم
  const modifiedRequest = new Request(newUrl, {
    method: request.method,
    headers: newHeaders,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'manual'
  });
  
  // درخواست رو ارسال می‌کنیم
  const response = await fetch(modifiedRequest);
  
  // هدرهای پاسخ رو کپی می‌کنیم
  const responseHeaders = new Headers(response.headers);
  
  // CORS headers اضافه می‌کنیم
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', '*');
  responseHeaders.set('Access-Control-Allow-Headers', '*');
  
  // پاسخ رو برمی‌گردونیم
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}
