import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-change-password-init',
  templateUrl: './change-password-init.component.html',
  styleUrls: ['./change-password-init.component.scss'],
})
export class ChangePasswordInitComponent implements OnInit {

  cpi: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.cpi = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    });
  }
  public sendOtp(){

    this.authService.sendOtp(this.cpi.value).subscribe(
      (data: any) => {
        alert('Đã gửi mail');
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
