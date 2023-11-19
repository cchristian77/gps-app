import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../interfaces/auth";
import {ApiService} from "../../services/api.service";
import {MessageService} from "primeng/api";
import {CookieService} from "../../services/cookie.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private cookieService: CookieService
  ) { }

  logout() {
    this.apiService.logout().subscribe(
      response => {
        this.cookieService.deleteCookie('token')
        this.router.navigate(['/login']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout Success !' });
      },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || "There is something is wrong." });
      }
    )
  }

}
