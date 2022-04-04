import { Component, OnInit } from '@angular/core';
import {Job} from '../../models/model/Job';
import {JobService} from '../../service/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss'],
})
export class HomePublicComponent implements OnInit {
  jobNews: Job[];
  jobDues: Job[];
  jobHighSalaries: Job[];
  page: number;
  size: number;
  totalPageJobNews: number;
  totalPageJobDues: number;
  totalPageJobHighSalary: number;

  constructor(private jobService: JobService,private readonly router: Router) { }

  ngOnInit(): void {
    this.getInitData();
    this.getJobNew();
    this.getJobHighSalary();
    this.getJobDue();
  }

  getInitData(){
    this.page = 0;
    this.size = 20;
    this.totalPageJobNews = 1;
    this.totalPageJobDues = 1;
    this.totalPageJobHighSalary= 1;
  }

  public getJobNew() {
    this.jobService.getJobNews(7, this.page, this.size).subscribe(
      (data: any) => {
        this.jobNews = data.list;
        this.totalPageJobNews = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getJobHighSalary() {
    this.jobService.getJobHighSalary(18, this.page, this.size).subscribe(
      (data: any) => {
        this.jobHighSalaries = data.list;
        this.totalPageJobHighSalary = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getJobDue() {
    this.jobService.getJobDue(3, this.page, this.size).subscribe(
      (data: any) => {
        this.jobDues = data.list;
        this.totalPageJobDues = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSignIn() {
    this.router.navigate(['/auth']).then(r => console.log(r));
  }
}
