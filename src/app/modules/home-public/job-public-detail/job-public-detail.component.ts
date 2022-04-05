import { Component, OnInit } from '@angular/core';
import {Job} from '../../../models/model/Job';
import {User} from '../../../models/model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../../../service/job.service';
import {UserService} from '../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-job-public-detail',
  templateUrl: './job-public-detail.component.html',
  styleUrls: ['./job-public-detail.component.scss'],
})
export class JobPublicDetailComponent implements OnInit {

  job: Job;
  user: User;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private jobService: JobService , private userService: UserService, private readonly router: Router) {
    // this.getUser();
  }

  ngOnInit(): void {
    this.getJobById();
    this.getUser();
  }


  public getJobById(): void {
    this.jobService.getJobById(this.route.snapshot.params.id).subscribe(
      (data: Job) => {
        this.job = data;
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
    if(token){
      this.getUserByUserName(token.sub);
    }
  }

  onApply() {
    const token = this.userService.getDecodedAccessToken();
    if(token){
      alert('ứng tuyển thành công');
    } else {
      alert('Vui lòng đăng nhập trước');
    }
  }
}
