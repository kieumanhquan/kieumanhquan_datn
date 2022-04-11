import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/home/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'User',
    icon: 'person-outline',
    link: '/home/user/list',
  },
  {
    title: 'JOB',
    group: true,
  },
  {
    title: 'Job',
    icon: 'browser-outline',
    link: '/home/list-job',
  },
  {
    title: 'JOB-REGISTER',
    group: true,
  },
  {
    title: 'Register-Job',
    icon: 'compass-outline',
    link: '/home/list-job-register',
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
