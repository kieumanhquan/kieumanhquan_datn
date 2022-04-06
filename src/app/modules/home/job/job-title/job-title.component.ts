import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {Router} from '@angular/router';
import {User} from '../../../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';
import {StatusDto} from '../../../../models/Dto/StatusDto';

@Component({
  selector: 'ngx-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent implements OnInit {
  @Input() job: Job;
  @Input() user: User;
  statusDto: StatusDto;
  displayPositionReason: boolean;

  currentDate = new Date().getTime();

  constructor(private readonly router: Router, private jobService: JobService) {
  }


  ngOnInit(): void {
  }

  public updateJob(statusDto){
    this.jobService.updateStatusJob(statusDto).subscribe(
      (data: any) => {
        this.job.statusJob = data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getInit(){
    this.statusDto ={jobId:1,statusId:1};
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

  onUp(){
    this.getInit();
    this.statusDto.jobId = this.job.id;
    this.statusDto.statusId = 2;
    this.updateJob(this.statusDto);
  }
}

