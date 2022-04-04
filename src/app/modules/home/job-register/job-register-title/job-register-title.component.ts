import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobRegister} from '../../../../models/model/JobRegister';

@Component({
  selector: 'ngx-job-register-title',
  templateUrl: './job-register-title.component.html',
  styleUrls: ['./job-register-title.component.scss'],
})
export class JobRegisterTitleComponent implements OnInit {

  @Input() jobRegister: JobRegister;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onReadDetail(id: number) {
    this.router.navigate(['/home/job-register-detail', id]).then(r => console.log(r));
  }

  onReadJobDetail(id: number) {
    this.router.navigate(['/home/job-detail', id]).then(r => console.log(r));
  }
}
