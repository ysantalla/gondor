import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { IndexComponent } from './index/index.component';
import { RoleGuard } from '@app/core/guard/role.guard';
import { CountUsersComponent } from './count-users/count-users.component';
import { CountFilesComponent } from './count-files/count-files.component';
import { CountRolesComponent } from './count-roles/count-roles.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {title: 'Escritorio', expectedRole: 'ADMIN'},
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IndexComponent, CountUsersComponent, CountFilesComponent, CountRolesComponent]
})
export class DashboardModule { }
