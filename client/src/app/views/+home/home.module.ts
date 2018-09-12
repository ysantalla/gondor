import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    data: {title: 'Escritorio'}
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Escritorio'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent, TestComponent]
})
export class HomeModule { }
