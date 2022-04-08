import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'ngx-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss'],
})
export class HomePublicComponent implements OnInit {
  user: any;

  constructor(private readonly router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
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

  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    if(token){
      this.getUserByUserName(token.sub);
    }
  }

  onSignIn() {
    this.router.navigate(['/auth']).then(r => console.log(r));
  }

  onSignUp() {
    this.router.navigate(['/auth/signup']).then(r => console.log(r));
  }

  onLogOut() {
    window.sessionStorage.removeItem('auth-token');
    this.user = undefined;
  }

  onEditInfo() {
    this.router.navigate(['home-public/user/edit']);
  }
}
