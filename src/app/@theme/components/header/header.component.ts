import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionService } from '../../../@core/services/session.service';
import { Router } from '@angular/router';
import {UserService} from '../../../service/user.service';
import {User} from '../../../models/model/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  userPictureOnly = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  user: User;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  picture='iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEVEeef///+4zPaKq/ChvPPn7' +
  'vxymu3Q3flbieqI1HvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMC' +
  'OCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  name=this.sessionService.getItem('auth-user');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentTheme = 'default';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  userMenu = [ { title: 'Profile' }, { title: 'Log out'   } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private sessionService: SessionService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const token = this.userService.getDecodedAccessToken();
    this.getUserByUserName(token.sub);

    this.menuService.onItemClick().subscribe((event)=>{
      if(event.item.title==='Log out'){
        this.sessionService.removeItem('auth-token');
        this.sessionService.removeItem('auth-user');
        this.router.navigate(['/auth/']).then(r => console.log(r));
      }
      if(event.item.title==='Profile'){
        this.router.navigate(['/home/profile']).then(r => console.log(r));
      }
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

}
