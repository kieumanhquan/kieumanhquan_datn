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
import {Profiles} from '../../../models/model/Profiles';
import {ProfilesService} from '../../../service/profiles.service';
import {JobRegisterService} from '../../../service/jobRegister.service';


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
  profile: Profiles = {
    academicLevel: undefined,
    delete: 0,
    description: '',
    desiredSalary: '',
    desiredWorkingAddress: '',
    desiredWorkingForm: '',
    id: 0,
    numberYearsExperience: 0,
    skill: '',
    user: undefined,
  };
  checkedProfile = false;

  displayPosition: boolean;
  position: string;

  fileCv: File;
  fileAvatar: File;

  constructor(private readonly route: ActivatedRoute, private jobService: JobService, private userService: UserService
    , private readonly router: Router, private fb: FormBuilder, private uploadService: UploadFileService,
              private jobRegisterService: JobRegisterService,private profilesService: ProfilesService) {
  }

  ngOnInit(): void {
    this.getJobById();
    this.getUser();
    this.genders = ['name', 'nữ', 'giới tính thứ 3'];
    this.getAcademicLevel();
    this.getWorkingForm();
    this.info = this.fb.group({
      description: [''],
      homeTown: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
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

  public addViews(){
    this.jobService.addView(this.route.snapshot.params.id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentDate = new Date();
  getInitData(){
    this.profile = {
      id:null,
      academicLevel: null,
      delete: 0,
      description: '',
      desiredSalary: '',
      desiredWorkingAddress: '',
      desiredWorkingForm: '',
      numberYearsExperience: 0,
      skill: '',
      user: undefined,
    };
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

  public getProfilesByUserId(): void {
    this.profilesService.getProfilesByUserId(this.user.id).subscribe(
      (data: Profiles) => {
        if(!data){
          this.getInitData();
        } else {
          this.profile = data;
        }
        this.checkedProfile = this.userService.checkProfile(this.profile);
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
        this.getProfilesByUserId();
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
      console.log('Day la id',this.route.snapshot.params.id);
      this.addViews();
    }
  }

  public updateUser(): void {
    this.userService.update(this.user).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public updateProfiles(): void {
    this.profilesService.update(this.profile).subscribe(
      (data: Profiles) => {
        this.profile = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onApply() {
    if (!this.checkedProfile) {
      let skills = '';
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.info.value.skills.length; i++) {
        if (i === this.info.value.skills.length - 1) {
          skills += this.info.value.skills[i];
        } else {
          skills += this.info.value.skills[i] + ',';
        }
      }
      this.user.avatarName = this.fileAvatar.name;
      this.user.homeTown = this.info.value.homeTown;
      this.user.birthday = this.info.value.birthday;
      this.profile.skill = skills;
      this.profile.numberYearsExperience = this.info.value.numberYearsExperience;
      this.profile.academicLevel = this.info.value.academicLevel;
      this.profile.desiredSalary = this.info.value.desiredSalary;
      this.profile.desiredWorkingAddress = this.info.value.desiredWorkingAddress;
      this.profile.desiredWorkingForm = this.info.value.workingForm.code;
      this.profile.user = this.user;
      this.uploadAvatar();
      this.updateUser();
    }
    this.profile.description = this.info.value.description;
    this.uploadCv();
    this.updateProfiles();
    this.router.navigate(['/home-public']).then(r => console.log(r));
  }

  onSelected(event) {
    this.fileCv = event.currentFiles[0];
    console.log('day la file', this.fileCv);
  }

  onSelectedAvatar(event) {
    this.fileAvatar = event.currentFiles[0];
    console.log('day la file', this.fileAvatar);
  }

  uploadCv() {
    this.uploadService.upload(this.fileCv, this.user.userName, this.job.id).subscribe(
      (data: any) => {
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
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

  onBeforeApply(top: string) {
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.position = top;
      this.displayPosition = true;
    } else {
      alert('Vui lòng đăng nhập trước');
      this.router.navigate(['/auth']).then(r => console.log(r));
    }
  }
}
