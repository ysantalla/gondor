import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


// We use the gql tag to parse our query string into a query document
const UsersConnection = gql`
  query usersConnection {
    usersConnection {
      aggregate {
       count
     }
   }
  }
`;

@Component({
  selector: 'app-count-users',
  template: `
    <div fxLayout="row">
      <div fxFlex="80" fxLayout="row"  fxLayoutAlign="center center">
        <mat-icon>person</mat-icon>
        <span class="spacer"></span>
        <span class="span-count">{{userCount}}</span>
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
export class CountUsersComponent implements OnInit, OnDestroy {

  loading: boolean;
  userCount: number;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: UsersConnection
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;

        if (!loading) {
          this.userCount = data.usersConnection.aggregate.count;
        }
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
