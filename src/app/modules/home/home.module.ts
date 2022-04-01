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
import {JobListComponent} from '../job-list/job-list.component';
import {JobDetailsComponent} from '../job-details/job-details.component';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {JobAddComponent} from '../job-add/job-add.component';
import {JobTitleComponent} from '../job-title/job-title.component';
<<<<<<< HEAD
import {RegistrationComponent} from '../registration/registration.component';
import {ChangePasswordInitComponent} from '../change-password-init/change-password-init.component';
import {ChangePasswordFinishComponent} from '../change-password-finish/change-password-finish.component';

=======
import {JobUpdateComponent} from "../job-update/job-update.component";
>>>>>>> 8898142327b4508bbff4a1956bdf35cbea85fadf


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
<<<<<<< HEAD
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
=======
      path: 'job-update/:id',
      component: JobUpdateComponent,
>>>>>>> 8898142327b4508bbff4a1956bdf35cbea85fadf
    },
  ],
}];

@NgModule({
<<<<<<< HEAD
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
    ],
=======
  declarations: [
    HomeComponent,
    ProfileComponent,
    JobListComponent,
    JobDetailsComponent,
    JobAddComponent,
    JobTitleComponent,
    JobUpdateComponent,
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
  exports: [],
>>>>>>> 8898142327b4508bbff4a1956bdf35cbea85fadf
})
export class HomeModule {
}
