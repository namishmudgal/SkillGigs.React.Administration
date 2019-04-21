export const fakeDelay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export function authHeader() {
  // return authorization header with jwt token
  let user: any = null;
  if (window.localStorage) {
    user = localStorage.getItem('user');
  }
  user = user ? JSON.parse(user) : null;
  if (user && user.token) {
      return { 'Authorization': 'Bearer ' + user.token };
  } else {
      return {};
  }
}

export function parseJwt (token: string) {
  if (token && token !== null) {
    const base64Url = token.split('.')[1];
	  const base64 = base64Url.replace('-', '+').replace('_', '/');
	  return JSON.parse(window.atob(base64));
  }
}