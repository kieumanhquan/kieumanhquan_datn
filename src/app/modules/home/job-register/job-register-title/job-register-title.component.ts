import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobRegister} from '../../../../models/model/JobRegister';
import {JobRegisterService} from '../../../../service/jobRegister.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-job-register-title',
  templateUrl: './job-register-title.component.html',
  styleUrls: ['./job-register-title.component.scss'],
})
export class JobRegisterTitleComponent implements OnInit {

  @Input() jobRegister: JobRegister;

  cvFileName: string;

  displayPositionReason: boolean;

  constructor(private readonly router: Router,private jobRegisterService: JobRegisterService) { }

  ngOnInit(): void {

  }

  onReadDetail(id: number) {
    this.router.navigate(['/home/job-register-detail', id]).then(r => console.log(r));
  }

  onReadJobDetail(id: number) {
    this.router.navigate(['/home/job-detail', id]).then(r => console.log(r));
  }

  onDownloadCV(id: any) {
    this.cvFileName = this.getCvFileName(this.jobRegister.cv);
    console.log('cvFileName',this.cvFileName);
    this.jobRegisterService.downloadCv(id).subscribe(
      blod => saveAs(blod, this.cvFileName),
    );
  }

  getCvFileName(cvFilePath: string) {
    if (!cvFilePath) {
      console.error('File path is null or undefined');
    }
    const cvFilePaths = cvFilePath.split('/');
    return cvFilePaths[cvFilePaths.length - 1];
  }

  showPositionDialogReason() {
    this.displayPositionReason = true;
  }

  close(closed: boolean){
    this.displayPositionReason = closed;
  }

}
