import {Component, Input, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../../../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'ngx-user-title',
  templateUrl: './user-title.component.html',
  styleUrls: ['./user-title.component.scss'],
})
export class UserTitleComponent implements OnInit {

  @Input() user: User;

  constructor(private readonly router: Router, private  userService: UserService) { }

  ngOnInit(): void {
  }
  onReadUserDetail(id: number) {
    this.router.navigate(['/home/user-detail', id]).then(r => console.log(r));
  }
  public  onDeactivate(userid: number) {
    this.userService.deactivateUser(userid).subscribe(
      (data: any) => {
   if(data===true){
     alert('Cập nhật thành công');
   }else{
     alert('Hủy cập nhật thất bại');
   }
   window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
}
