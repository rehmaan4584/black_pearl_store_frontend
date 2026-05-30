const TOKEN_KEY = 'buyerToken';
const AUTH_CHANGE_EVENT = 'buyer-auth-change';

export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function hasStoredToken() {
  return Boolean(getStoredToken());
}

export function subscribeToAuthChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined;

  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function persistToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}
