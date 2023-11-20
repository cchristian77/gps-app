import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CookieService} from "../../../services/cookie.service";
import {User} from "../../../interfaces/auth";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authUser: User | null = null

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    public cookieService: CookieService
  ) { }

  ngOnInit() {
    this.cookieService.authUser$.subscribe(authUser => this.authUser = authUser)
  }

  async logout() {
    await this.apiService.logout().then((response) => {
      this.cookieService.deleteCookie('token')
      this.cookieService.setAuthUser(null)
      this.router.navigate(['/login']);
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Logout Success !'});
    }).catch((error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || "There is something is wrong."
        });
      }
    )
  }

}
