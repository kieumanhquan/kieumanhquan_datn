import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../../../@core/services/session.service';
import { UserService } from '../../../service/user.service';
import { ProfileService } from './profile.service';
import {User} from '../../../models/model/User';


@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private userService: UserService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.getUser();
    console.log('user form'+ this.user);
  }
  initForm(){
   this.username = this.userService.getDecodedAccessToken().sub;
    this.formProfile = this.fb.group({
      name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      email: ['', Validators.required ,Validators.email],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      birthDay: ['', Validators.required],
      homeTown: [''],
      gender: [''],
    });
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    this.getUserByUserName(token.sub);
  }

  updateForm(user: User): void {
    this.formProfile.patchValue({
      name:user.name,
      email:user.email,
      phoneNumber:user.phoneNumber,
      birthDay:user.birthday,
      homeTown:user.homeTown,
      gender: user.gender,
    });
  }
  onSubmit() {
 this.updateUser();
  }
  public updateUser(){
    this.user=this.formProfile.value;
    const token = this.userService.getDecodedAccessToken();
    this.user.userName=token.sub;
    this.userService.updateUser(this.formProfile.value).subscribe(
      (data: any) => {
        // eslint-disable-next-line eqeqeq
        console.log(data);
        if (data.obj === true) {
          alert('Đăng ký thành công');
        } else {
          alert('Đăng ký thất bại');
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
}
