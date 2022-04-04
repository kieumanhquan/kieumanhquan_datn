import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {NbMenuModule} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from 'primeng/api';
import {PrimengModule} from '../../shared/primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JobListComponent} from './job/job-list/job-list.component';
import {JobDetailsComponent} from './job/job-details/job-details.component';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {JobAddComponent} from './job/job-add/job-add.component';
import {JobTitleComponent} from './job/job-title/job-title.component';
import {JobUpdateComponent} from './job/job-update/job-update.component';
import {RegistrationComponent} from '../registration/registration.component';
import {ChangePasswordInitComponent} from '../change-password-init/change-password-init.component';
import {ChangePasswordFinishComponent} from '../change-password-finish/change-password-finish.component';
import {JobRegisterListComponent} from './job-register/job-register-list/job-register-list.component';
import {JobRegisterTitleComponent} from './job-register/job-register-title/job-register-title.component';
import { JobRegisterDetailComponent } from './job-register/job-register-detail/job-register-detail.component';
import { ListJobRegisterComponent } from './job-register/list-job-register/list-job-register.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'list-job',
      component: JobListComponent,
    },
    {
      path: 'add-job',
      component: JobAddComponent,
    },
    {
      path: 'job-detail/:id',
      component: JobDetailsComponent,
    },
    {
      path: 'signup',
      component: RegistrationComponent,
    },
    {
      path: 'change-password/init',
      component: ChangePasswordInitComponent,
    },
    {
      path: 'change-password/finish',
      component: ChangePasswordFinishComponent,
    },
    {
      path: 'job-update/:id',
      component: JobUpdateComponent,
    },
    {
      path: 'list-job-register',
      component: JobRegisterListComponent,
    },
    {
      path: 'job-register-detail/:id',
      component: JobRegisterDetailComponent,
    },
    {
      path: 'list-job-register/:id',
      component: ListJobRegisterComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    JobListComponent,
    JobDetailsComponent,
    JobAddComponent,
    JobTitleComponent,
    RegistrationComponent,
    ChangePasswordInitComponent,
    ChangePasswordFinishComponent,
    JobUpdateComponent,
    JobRegisterListComponent,
    JobRegisterTitleComponent,
    JobRegisterDetailComponent,
    ListJobRegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    PaginatorModule,
  ],
  exports: [
    JobTitleComponent
  ],
})
export class HomeModule {
}
