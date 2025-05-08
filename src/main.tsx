
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CapacitorHttp } from '@capacitor/core';

// Полифилл для fetch API, чтобы использовать CapacitorHttp на мобильных устройствах
const originalFetch = window.fetch;
window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
  // На мобильных устройствах используем CapacitorHttp
  if ((window as any).Capacitor?.isNativePlatform()) {
    try {
      const url = input instanceof Request ? input.url : input.toString();
      const method = init?.method || 'GET';
      const headers = init?.headers ? Object.fromEntries(new Headers(init.headers).entries()) : {};
      const data = init?.body ? 
        (typeof init.body === 'string' ? JSON.parse(init.body) : init.body) : 
        undefined;
        
      const response = await CapacitorHttp.request({
        url,
        method,
        headers,
        data
      });
      
      return new Response(JSON.stringify(response.data), {
        status: response.status,
        headers: new Headers(response.headers)
      });
    } catch (error) {
      console.error('CapacitorHttp error:', error);
      // В случае ошибки пробуем использовать обычный fetch
      return originalFetch(input, init);
    }
  } else {
    // В браузере используем стандартный fetch
    return originalFetch(input, init);
  }
};

createRoot(document.getElementById("root")!).render(<App />);
