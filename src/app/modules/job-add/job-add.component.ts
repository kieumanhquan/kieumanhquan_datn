import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../../service/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JobDto} from '../../models/model/JobDto';

@Component({
  selector: 'ngx-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent implements OnInit {

  date7: Date;
  date8: Date;
  jobDto: JobDto;

  rfContact: FormGroup;
  constructor(private fb: FormBuilder,
              private jobService: JobService) { }

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
  }
  public addJob(){
    this.jobDto = this.rfContact.value;
    this.jobDto.creatorId = 1;
    this.jobDto.createDate = new Date();
    this.jobDto.updateUserId = 1;
    this.jobDto.updateDate = new Date();
    this.jobDto.skills = 'abhc';
    this.jobDto.statusJobId =1;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.jobDto.views =0;

    console.log(this.jobDto);
    // eslint-disable-next-line max-len
    this.jobService.addJob(this.jobDto).subscribe(
      (data: any) => {
        alert('Add than công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering

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
    console.log(this.rfContact.value);
    this.addJob();
  }

}
