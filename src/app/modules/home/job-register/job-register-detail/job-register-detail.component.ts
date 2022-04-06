import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/model/User';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JobRegister} from '../../../../models/model/JobRegister';
import {JobRegisterService} from '../../../../service/jobRegister.service';
import {Profiles} from '../../../../models/model/Profiles';
import {StatusRegisterDto} from '../../../../models/Dto/StatusRegisterDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduleDto} from '../../../../models/Dto/ScheduleDto';

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
  statusRegisterDto: StatusRegisterDto;
  scheduleDto: ScheduleDto;
  appointment: FormGroup;
  dateBook: Date;
  methods: any[];
  addressInterviews: any[];
  displayPosition: boolean;
  position: string;
  displayPositionReason: boolean;

  constructor(private readonly route: ActivatedRoute, private jobRegisterService: JobRegisterService,
              private userService: UserService,private fb: FormBuilder) {
    this.getUser();
  }

  ngOnInit(): void {
    this.getInitData();
    this.appointment = this.fb.group({
      dateBook: ['', [Validators.required]],
      method: [this.methods[0], [Validators.required]],
      addressInterview: [this.addressInterviews[0], [Validators.required]],
    });
    this.getJobById();
  }
  getInitData(){
    this.methods = ['online','offline'];
    this.addressInterviews = ['Skype','Zoom','Zalo'];
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

  public updateStatusJob(){
    this.jobRegisterService.updateStatusJob(this.statusRegisterDto).subscribe(
      (data: any) => {
        this.jobRegister.statusJobRegister =data.statusJobRegister;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public schedule(){
    this.jobRegisterService.schedule(this.scheduleDto).subscribe(
      (data: any) => {
        this.jobRegister.statusJobRegister =data.statusJobRegister;
        alert('Đặt lịch thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getInitStatusRegisterDto(){
    this.statusRegisterDto = {jobRegisterId:1,statusRegisterId:1};
  }

  onBrowse() {
    this.getInitStatusRegisterDto();
    this.statusRegisterDto.jobRegisterId = this.jobRegister.id;
    this.statusRegisterDto.statusRegisterId = 2;
    this.updateStatusJob();
  }

  onRefuse() {
    this.getInitStatusRegisterDto();
    this.statusRegisterDto.jobRegisterId = this.jobRegister.id;
    this.statusRegisterDto.statusRegisterId = 5;
    this.updateStatusJob();
  }

  onBook() {
    this.scheduleDto={
      addressInterview: '',
      dateInterview: undefined,
      jobRegisterId: 0,
      methodInterview: '',
      statusRegisterId: 0,
    };
    this.scheduleDto.jobRegisterId = this.jobRegister.id;
    this.scheduleDto.statusRegisterId = 3;
    this.scheduleDto.methodInterview = this.appointment.value.method;
    this.scheduleDto.dateInterview = this.appointment.value.dateBook;
    this.scheduleDto.addressInterview = this.appointment.value.addressInterview;
    this.schedule();
    this.displayPosition=false;
  }

  onConfirm() {
    this.getInitStatusRegisterDto();
    this.statusRegisterDto.jobRegisterId = this.jobRegister.id;
    this.statusRegisterDto.statusRegisterId = 4;
    this.updateStatusJob();
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
