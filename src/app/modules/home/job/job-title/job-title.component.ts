import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../models/model/Job';
import {Router} from '@angular/router';
import {User} from '../../../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {JobService} from '../../../../service/job.service';
import {StatusDto} from '../../../../models/Dto/StatusDto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'ngx-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent implements OnInit {
  @Input() job: Job;
  @Input() user: User;

  jobs: any[];
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  exportColumns = [{ title: 'Name', dataKey: 'name' },
    { title: 'Trình độ học vấn', dataKey: 'academicLevel' },
    { title: 'Địa chỉ làm việc', dataKey: 'addressWork' },
    { title: 'Lương', dataKey: 'salary' },
    { title: 'Mô tả', dataKey: 'description' }];

  exportPdf() {
    // eslint-disable-next-line max-len
    this.jobs = [{name:this.job.name,academicLevel:this.job.academicLevel.code,addressWork:this.job.addressWork,salary: this.job.salaryMax,description:this.job.description}];
    const doc = new jsPDF('p','px');
    doc.setFont('PTSans');
    doc.setFontSize(20);

    autoTable(doc, {
      columns: this.exportColumns,
      body: this.jobs,
      didDrawPage: (dataArg) => {
        doc.text('  Quây là 1',10,20);
      },
    });
    doc.save('job.pdf');
  }
}

