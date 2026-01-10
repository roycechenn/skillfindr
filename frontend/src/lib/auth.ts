const TOKEN_KEY = "skillfindr_token";

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export async function fakeLogin(email: string, password: string) {
  // Stubbed auth: pretend to get a JWT and persist it.
  await new Promise((resolve) => setTimeout(resolve, 350));
  saveToken(btoa(`${email}:${password}:${Date.now()}`));
  return { email };
}
