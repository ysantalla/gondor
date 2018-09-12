import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


// We use the gql tag to parse our query string into a query document
const FilesConnection = gql`
  query filesConnection {
    filesConnection {
      aggregate {
       count
     }
   }
  }
`;

@Component({
  selector: 'app-count-files',
  template: `
    <div fxLayout="row">
      <div fxFlex="80" fxLayout="row"  fxLayoutAlign="center center">
        <mat-icon>folder</mat-icon>
        <span class="spacer"></span>
        <span class="span-count">{{fileCount}}</span>
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
export class CountFilesComponent implements OnInit, OnDestroy {
  loading: boolean;
  fileCount: number;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: FilesConnection
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;

        if (!loading) {
          this.fileCount = data.filesConnection.aggregate.count;
        }
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}

