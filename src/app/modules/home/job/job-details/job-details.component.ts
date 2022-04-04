import {Component, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../models/model/User';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit{
  job: Job;
  user: User;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private jobService: JobService , private userService: UserService, private readonly router: Router) {
    this.getUser();
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.getJobById();
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
    this.getUserByUserName(token.sub);
  }



  onUpdate() {
    this.router.navigate(['/home/job-update', this.job.id]);
  }
}
