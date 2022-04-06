import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../models/model/User';
import {JobDto} from '../../../../models/model/JobDto';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';

@Component({
  selector: 'ngx-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent implements OnInit {
  @Input() job: Job;
  @Input() user: User;

  currentDate = new Date().getTime();

  constructor(private readonly router: Router, private jobService: JobService) {
  }

  ngOnInit(): void {
  }

  public updateJob(jobDto: JobDto) {
    this.jobService.updateJob(jobDto).subscribe(
      (data: any) => {
        this.job.statusJob = data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onReadDetail(id: number) {
    this.router.navigate(['/home/job-detail', id]).then(r => console.log(r));
  }

  onPreview(id: number) {
    this.router.navigate(['/home-public/job-detail', id]).then(r => console.log(r));
  }

  onReadList(id: number) {
    this.router.navigate(['/home/list-job-register', id]).then(r => console.log(r));
  }

}

