import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {StatusJob} from '../../../../models/model/StatusJob';
import {HttpErrorResponse} from '@angular/common/http';
import {JobRegister} from '../../../../models/model/JobRegister';
import {JobRegisterService} from '../../../../service/jobRegister.service';
import {SearchJobRegister} from '../../../../models/job/SearchJobRegister';

@Component({
  selector: 'ngx-job-register-list',
  templateUrl: './job-register-list.component.html',
  styleUrls: ['./job-register-list.component.scss'],
})
export class JobRegisterListComponent implements OnInit {

  public jobRegisters: JobRegister[];

  statusJobs: StatusJob[];

  searchJobRegister: SearchJobRegister;

  selectedStatusJobAdvanced: any;

  filteredStatusJobs: any[];

  selectedName: any;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;
  page: number;
  size: number;
  totalRecords: number;
  sortNumber: number;

  constructor(public jobRegisterService: JobRegisterService) {
  }

  ngOnInit(): void {
    this.getStatusRegisterJob();
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
    this.searchJobRegister = {name: this.selectedName,statusRegisterId:this.selectedStatusJobAdvanced.id};
    console.log(this.searchJobRegister);
    this.page = 0;
    this.size = 2;
    this.totalRecords = 5;
    this.sortNumber = 1;
  }

  public getStatusRegisterJob(): void {
    this.jobRegisterService.getStatusRegisterJob().subscribe(
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
    console.log(value,value);

    if (value.indexOf('name') === 0) {
      this.sortNumber = 2;
      this.onSortByName();
    } else {
      this.sortNumber = 1;
      this.onSearch();
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
    this.jobRegisterService.findJobRegister(this.searchJobRegister, this.page, this.size).subscribe(
      (data: any) => {
        this.jobRegisters = data.list;
        this.totalRecords = data.totalPage * this.size;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onSortByName() {
    // eslint-disable-next-line max-len
    this.jobRegisterService.sortByName(this.searchJobRegister, this.page, this.size).subscribe(
      (data: any) => {
        this.jobRegisters = data.list;
        this.totalRecords = data.totalPage * this.size;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    if(this.sortNumber === 1){
      this.onSearch();
    } else {
      this.onSortByName();
    }
  }

}
