import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/model/User';
import {SessionService} from '../../../@core/services/session.service';
import {ProfileService} from '../../home/profile/profile.service';
import {PrimeNGConfig} from 'primeng/api';
import {UserService} from '../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Profiles } from '../../../models/model/Profiles';
import {AcademicLevel} from '../../../models/model/AcademicLevel';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  [x: string]: any;
  formUser: FormGroup;
  user: User;
  username: string;
  profiles: Profiles ;
  academicLevels: AcademicLevel[];

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
    this.formUser = this.fb.group({
      name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      email: ['', Validators.required ,Validators.email],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      birthDay: ['', Validators.required],
      homeTown: [''],
      gender: [''],
      //profiles
      skill:[''],
      desiredSalary:[''],
      desiredWorkingAddress:[''],
      numberYearsExperience:[''],
      desiredWorkingForm:[''],
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

  public getAllAcademicLevel(): void {
    this.userService.getAllAcademicLevel().subscribe(
      (data: AcademicLevel[]) => {
        this.academicLevels = data;
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
    this.formUser.patchValue({
      name: this.user.name,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      birthDay: this.user.birthday,
      homeTown: this.user.homeTown,
      gender:this.user.gender,
      skill:this.profiles.skill,
      desiredSalary:this.profiles.desiredSalary,
      desiredWorkingAddress:this.profiles.desiredWorkingAddress,
      numberYearsExperience:this.profiles.numberYearsExperience,
      desiredWorkingForm:this.profiles.desiredWorkingForm,
    });
  }
  onSubmit() {
    this.updateUser();
  }

  getUserValue(): void {
    this.user.name=this.formUser.value.name;
    this.user.phoneNumber=this.formUser.value.phoneNumber;
    this.user.birthday=this.formUser.value.birthDay;
    this.user.homeTown=this.formUser.value.homeTown;
    this.user.gender=this.formUser.value.gender;
    this.user.userName=this.formUser.value.userName;
  }

  getProfilesValue(){
    this.profiles.user=this.user;
    this.profiles.skill=this.formUser.value.skill;
    this.profiles.desiredWorkingAddress=this.formUser.value.desiredWorkingAddress;
    this.profiles.academicLevel=this.formUser.value.academicLevel;
    this.profiles.desiredSalary=this.formUser.value.desiredSalary;
    this.profiles.desiredWorkingForm=this.formUser.value.desiredWorkingForm;
  }
  public updateUser(){
     this.getUserValue();
     this.getProfilesValue();
    const token = this.userService.getDecodedAccessToken();
    this.user.userName=token.sub;
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        // eslint-disable-next-line eqeqeq
        console.log(data);
        if (data.obj === true) {
          alert('Cập nhật thành công');
        } else {
          alert('Cập nhật thất bại');
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
    this.userService.updateUserProfile(this.profiles).subscribe(
      (data: any) => {
        console.log(data);
        if (data.obj === true) {
          alert('Cập nhật thành công');
        } else {
          alert('Cập nhật thất bại');
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public updateProfiles(){

  }
}


