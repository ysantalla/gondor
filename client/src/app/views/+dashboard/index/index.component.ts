import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  cards = [
    { title: 'Usuarios', cols: 1, rows: 1 },
    { title: 'Roles', cols: 1, rows: 1 },
    { title: 'Archivos', cols: 1, rows: 1 },
    { title: 'Card 2', cols: 2, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 2, rows: 1 }
  ];
}
