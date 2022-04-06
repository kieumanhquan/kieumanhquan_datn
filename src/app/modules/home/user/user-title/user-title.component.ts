import {Component, Input, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../../../../models/model/User';

@Component({
  selector: 'ngx-user-title',
  templateUrl: './user-title.component.html',
  styleUrls: ['./user-title.component.scss'],
})
export class UserTitleComponent implements OnInit {

  @Input() user: User;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }
  onReadUserDetail(id: number) {
    this.router.navigate(['/home/user-detail', id]).then(r => console.log(r));
  }
}
