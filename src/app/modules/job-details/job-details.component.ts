import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Job} from '../../models/model/Job';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit{
  @Input() job: Job;

  currentDate = new Date().getTime();
  constructor() { }

  ngOnInit(): void {
  }

}
