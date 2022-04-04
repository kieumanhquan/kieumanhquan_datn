import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../../../../service/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JobDto} from '../../../../models/model/JobDto';
import {JobPosition} from '../../../../models/model/JobPosition';
import {WorkingForm} from '../../../../models/model/WorkingForm';
import {AcademicLevel} from '../../../../models/model/AcademicLevel';
import {Rank} from '../../../../models/model/Rank';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../models/model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent implements OnInit {

  date7: Date;
  date8: Date;
  jobDto: JobDto;
  jobPositions: JobPosition[];
  workingForms: WorkingForm[];
  academicLevels: AcademicLevel[];
  ranks: Rank[];
  jes: User[];

  rfContact: FormGroup;
  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private userService: UserService,
              private readonly router: Router) { }

  ngOnInit() {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      jobPositionId: ['', [Validators.required, Validators.minLength(3)]],
      numberExperience: ['', [Validators.required, Validators.minLength(3)]],
      workingFormId: ['', [Validators.required, Validators.minLength(3)]],
      addressWork: ['', [Validators.required, Validators.minLength(3)]],
      academicLevelId: ['', [Validators.required, Validators.minLength(3)]],
      rankId: ['', [Validators.required, Validators.minLength(3)]],
      qtyPerson: ['', [Validators.required, Validators.minLength(3)]],
      startRecruitmentDate: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      benefits: ['', [Validators.required, Validators.minLength(3)]],
      jobRequirement: ['', [Validators.required, Validators.minLength(3)]],
      salaryMin: ['', [Validators.required, Validators.minLength(3)]],
      salaryMax: ['', [Validators.required, Validators.minLength(3)]],
      contactId: ['', [Validators.required, Validators.minLength(3)]],
      skills: this.fb.array([
        this.fb.control(''),
      ]),
    });
    this.getJobPosition();
    this.getAcademicLevel();
    this.getWorkingForm();
    this.getRank();
    this.getJe();
  }
  public addJob(){
    console.log('skills',this.rfContact.value.skills);
    let skills ='';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0 ;i<this.rfContact.value.skills.length;i++){
      if( i === this.rfContact.value.skills.length-1){
        skills += this.rfContact.value.skills[i];
      } else {
        skills += this.rfContact.value.skills[i]+',';
      }
    }
    this.jobDto = this.rfContact.value;
    this.jobDto.creatorId = 1;
    this.jobDto.createDate = new Date();
    this.jobDto.updateUserId = 1;
    this.jobDto.updateDate = new Date();
    this.jobDto.statusJobId =1;
    this.jobDto.skills =skills;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.jobDto.views =0;
    // eslint-disable-next-line max-len
    this.jobService.addJob(this.jobDto).subscribe(
      (data: any) => {
        alert('Add thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getJobPosition(){
    this.jobService.getJobPosition().subscribe(
      (data: any) => {
        this.jobPositions = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getWorkingForm(){
    this.jobService.getWorkingForm().subscribe(
      (data: any) => {
        this.workingForms = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getAcademicLevel(){
    this.jobService.getAcademicLevels().subscribe(
      (data: any) => {
        this.academicLevels = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getRank(){
    this.jobService.getRanks().subscribe(
      (data: any) => {
        this.ranks = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getJe(){
    this.userService.getJe().subscribe(
      (data: any) => {
        this.jes = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get skills(): FormArray {
    return this.rfContact.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    // Do something awesome
    this.addJob();
    console.log('abc:',this.rfContact.value);
    this.router.navigate(['/home/list-job']).then(r => console.log(r));
  }

}
