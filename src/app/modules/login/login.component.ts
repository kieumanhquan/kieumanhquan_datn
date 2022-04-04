import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../@core/services/auth.service';
import {TokenService} from '../../@core/services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          // this.tokenService.saveUser(data.username);
          // this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/home/']);
        },
      );
    }
  }
  forgotPassword() {
    this.router.navigate(['/auth/change-password/init']);
  }
}
