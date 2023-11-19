import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {User} from "../../interfaces/auth";
import {MessageService} from "primeng/api";
import {Router} from '@angular/router';
import {CookieService} from "../../services/cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  loading: boolean = false;

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  async login() {
    this.loading = true

    const data = {...this.loginForm.value}

    await this.apiService.login(data as User)
      .then((response: any) => {
        this.cookieService.setCookie({
          name: "token",
          value: response.data.token,
          session: true,
        })
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login success !'});
        this.router.navigate(['/gps']);
      })
      .catch((error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || "There is something is wrong."
        });
      }).finally(() => this.loading = false)
  }
}
