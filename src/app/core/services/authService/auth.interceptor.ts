

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token'); // Retrieve the token

  // Clone and modify the request to include the Authorization header if a token exists
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // Pass the request to the next handler
  return next(clonedRequest);
};
