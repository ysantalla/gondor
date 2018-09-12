import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatGridListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatTreeModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatPaginatorIntl,

} from '@angular/material';

import { CustomMatPaginatorIntl } from '@app/shared/class/mat-paginator-intl';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from '@app/shared/confirm/confirm.component';
import { TreeMenuComponent } from './tree-menu/tree-menu.component';
import { SizePipe } from '@app/shared/pipes/size.pipe';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTreeModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTreeModule,
    FlexLayoutModule,

    RouterModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTreeModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTreeModule,
    FlexLayoutModule,

    LayoutComponent,
    ConfirmComponent,
    TreeMenuComponent,
    SizePipe
  ],
  declarations: [LayoutComponent, ConfirmComponent, TreeMenuComponent, SizePipe],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ],
  entryComponents: [
    ConfirmComponent
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
