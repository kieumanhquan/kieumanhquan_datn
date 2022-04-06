import {Component, OnInit} from '@angular/core';
import {Job} from '../../../models/model/Job';
import {User} from '../../../models/model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../../../service/job.service';
import {UserService} from '../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AcademicLevel} from '../../../models/model/AcademicLevel';
import {WorkingForm} from '../../../models/model/WorkingForm';
import {UploadFileService} from '../../../service/upload.service';

@Component({
  selector: 'ngx-job-public-detail',
  templateUrl: './job-public-detail.component.html',
  styleUrls: ['./job-public-detail.component.scss'],
})
export class JobPublicDetailComponent implements OnInit {

  job: Job;
  user: User;
  info: FormGroup;
  genders: any[];
  academicLevels: AcademicLevel[];
  workingForms: WorkingForm[];

  displayPosition: boolean;
  position: string;

  file: File;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private jobService: JobService, private userService: UserService
    , private readonly router: Router, private fb: FormBuilder, private uploadService: UploadFileService) {
    // this.getUser();
  }

  ngOnInit(): void {
    this.getJobById();
    this.getUser();
    this.genders = ['name', 'nữ', 'giới tính thứ 3'];
    this.getAcademicLevel();
    this.getWorkingForm();
    this.info = this.fb.group({
      homeTown: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      avatarName: ['', [Validators.required]],
      skills: this.fb.array([
        this.fb.control(''),
      ]),
      numberYearsExperience: ['', [Validators.required]],
      academicLevel: ['', [Validators.required]],
      desiredSalary: ['', [Validators.required]],
      desiredWorkingAddress: ['', [Validators.required]],
      workingForm: ['', [Validators.required]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get skills(): FormArray {
    return this.info.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
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

  public getWorkingForm() {
    this.jobService.getWorkingForm().subscribe(
      (data: any) => {
        this.workingForms = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getAcademicLevel() {
    this.jobService.getAcademicLevels().subscribe(
      (data: any) => {
        this.academicLevels = data;
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
        console.log('roles', data.roles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.getUserByUserName(token.sub);
    }
  }

  onApply(position: string) {
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.position = position;
      this.displayPosition = true;
    } else {
      alert('Vui lòng đăng nhập trước');
    }
  }

  onSelected(event) {
    this.file = event.currentFiles[0];
    console.log('day la file', this.file);
  }

  onBeforeUpload() {
    this.uploadService.upload(this.file,this.user.userName,this.job.id).subscribe(
      (data: any) => {
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
