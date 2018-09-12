import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


// We use the gql tag to parse our query string into a query document
const RolesConnection = gql`
  query rolesConnection {
    rolesConnection {
      aggregate {
       count
     }
   }
  }
`;

@Component({
  selector: 'app-count-roles',
  template: `
    <div fxLayout="row">
      <div fxFlex="80" fxLayout="row" fxLayoutAlign="center center">
        <mat-icon>supervisor_account</mat-icon>
        <span class="spacer"></span>
        <span class="span-count">{{rolCount}}</span>
      </div>
    </div>
  `,
  styles: [`
    .span-count {
      font-size: 70px;
    }

    mat-icon {
      font-size: 80px;
      width: 70px;
      height: 80px;
      margin-bottom: 20px;
    }

  `]
})
export class CountRolesComponent implements OnInit, OnDestroy {
  loading: boolean;
  rolCount: number;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: RolesConnection
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;

        if (!loading) {
          this.rolCount = data.rolesConnection.aggregate.count;
        }
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}

