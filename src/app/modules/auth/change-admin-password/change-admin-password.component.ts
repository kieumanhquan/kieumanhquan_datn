import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.scss'],
})
export class ChangeAdminPasswordComponent implements OnInit {
  cdp: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.cdp = this.fb.group({
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      // eslint-disable-next-line max-len
      newPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
    });
  }
  public sendOtp(){
    this.authService.changePassword(this.cdp.value,window.sessionStorage.getItem('email')).subscribe(
      (data: any) => {
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  onSubmit() {
    this.sendOtp();
    this.router.navigate(['/auth']).then(r => console.log(r));
  }

}
