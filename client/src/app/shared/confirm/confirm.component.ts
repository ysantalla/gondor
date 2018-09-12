import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm',
  template: `
  <h2 mat-dialog-title>Confirmación</h2>
  <mat-dialog-content><h3 mat-dialog-title>{{data.message}}</h3></mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>No</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button [mat-dialog-close]="true">Sí</button>
  </mat-dialog-actions>
  `,
  styles: []
})
export class ConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
