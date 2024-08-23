import { User } from "../types/user";

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}

export const getToken = (): string | null => {
    return localStorage.getItem('token');
}

export const removeToken = (): void => {
    localStorage.removeItem('token');
}

export const getUser = async (): Promise<User | null> => {
  const token: string | null = getToken();
  if (!token) {
    return null;
  }
  return fetch('http://localhost:2024/auth/user', {
    headers: {
      'x-access-token': `Bearer ${getToken()}`
    }
  }).then(response => response.ok 
    ? response.json().then(data => data.user ?? null)
    : null
  )
}
