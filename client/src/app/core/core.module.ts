import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink  } from 'apollo-angular-link-http';
import { ApolloLink, split  } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { onError } from 'apollo-link-error';

import { environment as env } from '@env/environment';
import { AuthService } from '@app/core/services/auth.service';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { RoleGuard } from '@app/core/guard/role.guard';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';
import { SubscriptionClient } from 'subscriptions-transport-ws';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  providers: [AuthGuard, RoleGuard, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }],
  declarations: []
})
export class CoreModule {

  public subscriptionClient: SubscriptionClient = null;

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    public apollo: Apollo,
    public httpLink: HttpLink,
    private authService: AuthService
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    const http = httpLink.create({
      uri: env.httpLinkServer,
    });

    const auth_middleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set(
          'authorization',
          `Bearer ${this.authService.getToken()}` || null
        )
      });
      return forward(operation);
    });

    const error_link = onError(({ graphQLErrors, networkError, forward, response, operation }) => {
      if (graphQLErrors) {
        console.log(`GraphQL error ${graphQLErrors}`);
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
       }
    });

    const http_link = auth_middleware.concat(error_link.concat(http));

    // Create a WebSocket link:
    const subscriptionLink = new WebSocketLink({
      uri: env.wsLinkServer,
      options: {
        reconnect: true,
        timeout: 20000,
      }
    });

    this.subscriptionClient = (<any>subscriptionLink).subscriptionClient;

    const subscriptionMiddleware = {
      applyMiddleware: async (options, next) => {
        const token = await this.authService.getToken();
        options.authorization = `Bearer ${token}`;
        next();
      },
    };

    this.subscriptionClient.use([subscriptionMiddleware]);

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      subscriptionLink,
      http_link
    );

    this.apollo.create({
      link: link,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'none',
        },
        query: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'none',
        },
        mutate: {
          errorPolicy: 'none',
        },
      },
    });
  }
}
