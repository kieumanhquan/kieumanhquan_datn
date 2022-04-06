import {Component, Input, OnInit} from '@angular/core';
import {JobRegister} from '../../../../models/model/JobRegister';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../../service/user.service';



@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

   user: User;
  userId: number;

  // eslint-disable-next-line max-len
  constructor(private readonly route: ActivatedRoute, private userService: UserService) {
    this.getUserById();
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.getUserById();
  }


  public getUserById(): void {
    this.userService.getUserById(this.route.snapshot.params.id).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
        console.log('roles',data.roles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


}
