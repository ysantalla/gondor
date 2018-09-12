import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {title: 'Unauthorized'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnauthorizedComponent]
})
export class ErrorModule { }
