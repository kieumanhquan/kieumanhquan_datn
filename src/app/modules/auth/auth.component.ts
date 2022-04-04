import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
 email: string;
  constructor(
  ) { }
  ngOnInit(): void {

  }
  getChildData($event) {

    this.email= $event;
    console.log('test'+this.email);
  }






}
