import { Resolver, ResolveProperty  } from '@nestjs/graphql';

@Resolver('Node')
export class NodeResolver {

  constructor(
  ) { }

  @ResolveProperty('__resolveType')
  __resolveType(obj) {
    if (obj.firstname) {
      return 'User';
    }
    return 'Not found';
  }
}
