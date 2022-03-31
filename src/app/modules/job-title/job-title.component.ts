import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../models/model/Job';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
})
export class JobTitleComponent implements OnInit {
  @Input() job: Job;

  currentDate = new Date().getTime();
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onReadDetail(id: number) {
    this.router.navigate(['/home/job-detail', id]);
  }
}
