import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-change-password-finish',
  templateUrl: './change-password-finish.component.html',
  styleUrls: ['./change-password-finish.component.scss'],
})
export class ChangePasswordFinishComponent implements OnInit {

  cpf: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.cpf = this.fb.group({
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      // eslint-disable-next-line max-len
      newPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      otp: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5),Validators.pattern('^[0-9]*$')]],
    });
  }
  public sendOtp(){

    this.authService.sendOtp(this.cpf.value).subscribe(
      (data: any) => {
        alert('Đã đổi mật khẩu mới');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  onSubmit() {
    this.sendOtp();
  }
}
