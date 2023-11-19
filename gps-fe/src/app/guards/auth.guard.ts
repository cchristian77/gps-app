import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { CookieService } from "../services/cookie.service";

const cookieService = CookieService
export const authGuard: CanActivateFn = (route, state) => {

  const cookieService: CookieService = inject(CookieService)

  if (cookieService.getCookie('token')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['/login']);
  }
};
