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
import {UploadFileService} from '../../../service/upload.service';
import {DomSanitizer} from '@angular/platform-browser';
import { DownloadFileService } from '../../../service/download.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  avatarUrl: string;
  formUser: FormGroup;
  user: User;
  username: string;
  profiles: Profiles ;
  academicLevels: AcademicLevel[];
  birthday: string;
  fileAvatar: File;
  avatar: any;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private  uploadService: UploadFileService,
    private sanitizer: DomSanitizer,
    private  downloadService: DownloadFileService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllAcademicLevel();
    this.getUser();
    console.log('user form: '+ this.user);
  }
  initForm(){
    const birthday = new Date(this.user.birthday);
    console.log(birthday);
    // eslint-disable-next-line max-len
    this.birthday = `${birthday.getDate()}/${birthday.getMonth()}/${birthday.getFullYear()} ${birthday.getHours()}:${birthday.getMinutes()}`;
    this.formUser = this.fb.group({
      name: [''],
      email: ['', Validators.required ,Validators.email],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      birthDay: ['', Validators.required],
      homeTown: [''],
      gender: [''],
      //profiles
      skill:['',Validators.required],
      desiredSalary:['',Validators.required],
      desiredWorkingAddress:['',Validators.required],
      numberYearsExperience:['',Validators.required,Validators.pattern('([0-9][0-9])|([1-9]\\d{3}\\d*)')],
      desiredWorkingForm:['',Validators.required],
      academicLevel:['',Validators.required],
    });
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        console.log('data: ',data);
        this.user = data;
        this.avatarUrl=environment.apiImageUrl+this.user.avatarName;
        this.getProfiles();
        console.log('data pass: ',this.user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  showAvatar(){
    this.downloadService.getAvatar(this.user.avatarName).subscribe(
      (data: any ) => {
        console.log('data image avatar: ',data);
        this.avatar = data;
        const objectURL = 'data:image/jpg;base64,' + data.image;
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log('data pass image: ',this.avatar);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getProfilesByUserId(username: number): void {
    this.userService.getUserProfilesByUserId(username).subscribe(
      (data: Profiles) => {
        this.profiles = data;
        this.showAvatar();
        this.initForm();
        console.log('data pass: ',this.profiles);
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
  public getProfiles(): void {
    this.getProfilesByUserId(this.user.id);
  }
  onSubmit() {
    this.updateUser();
    console.log('User id: ', this.user.id);
    this.uploadAvatar();
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
    console.log('pp',this.profiles);
    this.userService.updateUserProfile(this.profiles).subscribe(
      (data: any) => {
       if(!data){
         alert('chua updata');
       }else {
         alert('up ok ');
       }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  onSelectedAvatar(event) {
    this.fileAvatar = event.currentFiles[0];
    console.log('day la file', this.fileAvatar);
  }

  uploadAvatar() {
    this.uploadService.uploadAvatar(this.fileAvatar, this.user.id).subscribe(
      (data: any) => {
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }



}


