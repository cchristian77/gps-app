import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {User} from "../../interfaces/auth";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';
import {CookieService} from "../../services/cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

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

  login() {
    const data  = { ...this.loginForm.value }

    this.apiService.login(data as User).subscribe(
      (response: any) => {
        this.cookieService.setCookie({
          name: "token",
          value: response.data.token,
          session: true,
        })
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success !' });
        this.router.navigate(['/summary']);
      },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || "There is something is wrong." });
      }
    )
  }
}
