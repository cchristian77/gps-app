import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {confirmPasswordMatchValidator} from "../../shared/password-match.directive";
import {User} from "../../interfaces/auth";
import {MessageService} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: confirmPasswordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) { }

  loading: boolean = false;

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  async submit() {
    this.loading = true

    const data = {...this.registerForm.value}
    delete data.confirmPassword

    await this.apiService.register(data as User)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Register success !'});
        this.router.navigate(['login'])
      })
      .catch((error) => {
        console.log(error)
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
      })
      .finally(() => this.loading = false)
  }

}
