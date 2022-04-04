import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/model/User';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JobRegister} from '../../../../models/model/JobRegister';
import {JobRegisterService} from '../../../../service/jobRegister.service';
import {Profiles} from '../../../../models/model/Profiles';

@Component({
  selector: 'ngx-job-register-detail',
  templateUrl: './job-register-detail.component.html',
  styleUrls: ['./job-register-detail.component.scss'],
})
export class JobRegisterDetailComponent implements OnInit {

  jobRegister: JobRegister;
  user: User;
  profiles: Profiles;
  userId: number;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private jobRegisterService: JobRegisterService,
              private userService: UserService) {
    this.getUser();
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.getJobById();
  }


  public getJobById(): void {
    this.jobRegisterService.getJobRegisterById(this.route.snapshot.params.id).subscribe(
      (data: JobRegister) => {
        this.jobRegister = data;
        this.getProfilesByUserId(data.user.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getProfilesByUserId(id: number): void {
    this.jobRegisterService.getProfilesByUserId(id).subscribe(
      (data: Profiles) => {
        this.profiles = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
        console.log('roles',data.roles);
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



  onUpdate() {

  }

}
