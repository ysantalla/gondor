import { Resolver, ResolveProperty  } from '@nestjs/graphql';

@Resolver('Node')
export class NodeResolver {

  constructor(
  ) { }

  @ResolveProperty('id')
  __resolveType(obj) {
    console.log(obj);
    if (obj.firstname) {
      return 'LoginFailure';
    }
    return 'LoginSuccess';
  }
}
