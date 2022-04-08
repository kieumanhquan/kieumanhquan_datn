import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePublicComponent } from './home-public.component';
import {RouterModule, Routes} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {JobPublicTitleComponent} from './job-public-title/job-public-title.component';
import { JobPublicDetailComponent } from './job-public-detail/job-public-detail.component';
import { JobPublicInfoComponent } from './job-public-info/job-public-info.component';
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";

const routes: Routes = [{
  path: '',
  component: HomePublicComponent,
  children: [
    {
      path: '',
      component: JobPublicInfoComponent,
    },
    {
      path: 'job-detail/:id',
      component: JobPublicDetailComponent,
    },
  ],
}];

@NgModule({
  declarations: [
    HomePublicComponent,
    JobPublicTitleComponent,
    JobPublicDetailComponent,
    JobPublicInfoComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AvatarModule,
        BadgeModule,
        ButtonModule,
        RippleModule,
        DialogModule,
        ReactiveFormsModule,
        CalendarModule,
        FileUploadModule,
        InputTextareaModule,
    ],
})
export class HomePublicModule { }
