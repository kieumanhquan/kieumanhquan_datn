import {Component, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../models/model/User';
import {JobDto} from '../../../../models/model/JobDto';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit{
  job: Job;
  user: User;
  jobDto: JobDto ;

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

  public updateJob(jobDto: JobDto){
    this.jobService.updateJob(jobDto).subscribe(
      (data: any) => {
        this.job.statusJob =data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onUpdate() {
    this.router.navigate(['/home/job-update', this.job.id]).then(r => console.log(r));
  }

  onPreview(id: number) {
    this.router.navigate(['/home-public/job-detail', id]).then(r => console.log(r));
  }

  convertData(){
    console.log('jobDetail',this.job);
    this.jobDto = {
      jobRequirement: '',
      workingFormId: 0,
      academicLevelId: 0,
      addressWork: '',
      benefits: '',
      contactId: 0,
      creatorId: 0,
      description: '',
      dueDate: undefined,
      id: 0,
      jobPositionId: 0,
      name: '',
      numberExperience: 0,
      qtyPerson: 0,
      rankId: 0,
      salaryMax: 0,
      salaryMin: 0,
      skills: '',
      statusJobId: 0,
      updateDate: undefined,
      updateUserId: 0,
      views: 0,
    };
    console.log('jobDto',this.jobDto);
    this.jobDto.id = this.job.id;
    this.jobDto.updateDate = this.job.updateDate;
    this.jobDto.updateUserId = this.job.updateUser.id;
    this.jobDto.name = this.job.name;
    this.jobDto.jobPositionId = this.job.jobPosition.id;
    this.jobDto.numberExperience = this.job.numberExperience;
    this.jobDto.addressWork = this.job.addressWork;
    this.jobDto.academicLevelId = this.job.academicLevel.id;
    this.jobDto.workingFormId=this.job.workingForm.id;
    this.jobDto.rankId = this.job.rank.id;
    this.jobDto.qtyPerson = this.job.qtyPerson;
    this.jobDto.createDate = this.job.createDate;
    this.jobDto.dueDate = this.job.dueDate;
    this.jobDto.skills = this.job.skills;
    this.jobDto.startRecruitmentDate = this.job.startRecruitmentDate;
    this.jobDto.description = this.job.description;
    this.jobDto.benefits = this.job.benefits;
    this.jobDto.salaryMin = this.job.salaryMin;
    this.jobDto.salaryMax = this.job.salaryMax;
    this.jobDto.contactId = this.job.contact.id;
    this.jobDto.statusJobId = this.job.statusJob.id;
    this.jobDto.views = this.job.views;
    this.jobDto.creatorId = this.job.creator.id;
    this.jobDto.delete = this.job.delete;
    this.jobDto.jobRequirement = this.job.jobRequirement;
  }

  onBrowse() {
    this.convertData();
    this.jobDto.statusJobId = 3;
    this.updateJob(this.jobDto);
  }

  onUp() {
    this.convertData();
    this.jobDto.statusJobId = 2;
    this.updateJob(this.jobDto);
  }

  onStop() {
    this.convertData();
    this.jobDto.statusJobId = 3;
    this.updateJob(this.jobDto);
  }

  onClose() {
    this.convertData();
    this.jobDto.statusJobId = 4;
    this.updateJob(this.jobDto);
  }

  onDelete() {
    this.convertData();
    this.jobDto.statusJobId = 5;
    this.updateJob(this.jobDto);
  }
}
