import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from "../services/cookie.service";
import {ApiService} from "../services/api.service";
import {GpsIndex} from "../interfaces/gps";
import {Pagination} from "../interfaces/pagination";
import * as moment from "moment/moment";
import {MessageService} from "primeng/api";
import {User} from "../interfaces/auth";

const cookieService = CookieService
export const authGuard: CanActivateFn = async (route, state) => {
  const cookieService: CookieService = inject(CookieService)
  const apiService: ApiService = inject(ApiService)
  const messageService: MessageService = inject(MessageService)
  const router = inject(Router);

  let success: boolean = false
  if (cookieService.getCookie('token')) {
    await apiService.profile()
      .then((response: any) => {
        success = true
        cookieService.setAuthUser(response.data as User)
      })
      .catch((error) => {
        console.log(error)
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || "There is something is wrong."
        });
      })

    // @ts-ignore
    // prevent navigate to login path if user has already authenticated
    // if (route.routeConfig.path === 'login') {
    //   return router.navigate(['/gps']);
    // }

    if (success) {
      return true;
    }
  }

  return router.navigate(['/login']);
};
