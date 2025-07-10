export default {
  async fetch(request, env) {
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
    
    // درخواست جدید می‌سازیم
    const modifiedRequest = new Request(newUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'manual'
    });
    
    // درخواست رو ارسال می‌کنیم
    const response = await fetch(modifiedRequest);
    
    // پاسخ رو برمی‌گردونیم
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    
    // CORS headers اضافه می‌کنیم
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', '*');
    
    return modifiedResponse;
  }
};
