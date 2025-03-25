export const setCookie = (name: string, value: string, days: number): void => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; secure; httpOnly; sameSite=strict";
  };
  
  export const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    let result: string | null = null;
    ca.forEach((c) => {
      let trimmedCookie = c.trim();
      if (trimmedCookie.indexOf(nameEQ) === 0) {
        result = trimmedCookie.substring(nameEQ.length, trimmedCookie.length);
      }
    });
    return result;
  };
  
  export const deleteCookie = (name: string): void => {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  
  export const getAllCookies = (): { [key: string]: string } => {
    const cookies: { [key: string]: string } = {};
    const ca = document.cookie.split(';');
    ca.forEach((c) => {
      let trimmedCookie = c.trim();
      const parts = trimmedCookie.split('=');
      if (parts.length === 2) {
        cookies[parts[0]] = parts[1];
      }
    });
    return cookies;
  };