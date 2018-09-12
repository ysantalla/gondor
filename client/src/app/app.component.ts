import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  envName = env.envName;
  appName = env.appName;

  constructor(
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }
}
