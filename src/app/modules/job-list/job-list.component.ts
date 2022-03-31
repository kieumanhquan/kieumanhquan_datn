// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {Job} from '../../models/model/Job';
import {JobService} from '../../service/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {StatusJob} from '../../models/model/StatusJob';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  public jobs: Job[];

  statusJobs: any[];

  selectedStatusJobAdvanced: any;

  filteredStatusJobs: any[];

  selectedName: any;
  selectedSalaryMin: any;
  selectedSalaryMax: any;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;
  page: number;
  size: number;
  totalRecords: number;

  constructor(public jobService: JobService) {
  }

  ngOnInit(): void {
    this.getStatusJob();
    this.sortOptions = [
      {label: 'Tên công việc', value: 'name'},
      {label: 'Thời gian nộp hồ sơ', value: 'dueDate'},
    ];
    this.getInnitData();
    this.onSearch();
  }

  getInnitData() {
    this.selectedName = '';
    this.selectedStatusJobAdvanced = {id: 1, code: 'Chờ duyệt'};
    this.selectedSalaryMin = 0;
    this.selectedSalaryMax = 1000000000;
    this.page = 0;
    this.size = 2;
    this.totalRecords = 5;
  }

  public getStatusJob(): void {
    this.jobService.getStatusJob().subscribe(
      (data: StatusJob[]) => {
        this.statusJobs = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('name') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  filterStatusJob(event) {
    // eslint-disable-next-line max-len
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.statusJobs.length; i++) {
      const statusJob = this.statusJobs[i];
      // eslint-disable-next-line eqeqeq
      if (statusJob.code.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(statusJob);
      }
    }
    this.filteredStatusJobs = filtered;
  }

  public onSearch() {
    // eslint-disable-next-line max-len
    this.jobService.findJob(this.selectedName, this.selectedStatusJobAdvanced.id, this.selectedSalaryMin, this.selectedSalaryMax, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage * this.size;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onPaginator() {
    // eslint-disable-next-line max-len
    this.jobService.findJob(this.selectedName, this.selectedStatusJobAdvanced.id, this.selectedSalaryMin, this.selectedSalaryMax, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.onPaginator();
  }
}
