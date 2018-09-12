import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Info,
} from '@nestjs/graphql';

import { Prisma, Role } from '../../../generated/prisma';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloError } from 'apollo-server-core';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver('Role')
export class RoleResolver {
  constructor(
    private readonly prisma: Prisma,
  ) {}

  @Query('roles')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async roles(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Role[]> {
    return await this.prisma.query.roles(args, info);
  }

  @Query('role')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async role(
    @Args('id') id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Role> {
    return await this.prisma.query.role({ where: { id } }, info);
  }

  @Query('rolesConnection')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async rolesConnection(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.query.rolesConnection({ ...args }, info);
  }

  @Mutation('createRole')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async createRole(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.createRole(
      {
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('updateRole')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async updateRole(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const roleExist = await this.prisma.exists.Role({ id: args.where.id });

    if (!roleExist) {
      throw new ApolloError(`Role not found`);
    }

    return await this.prisma.mutation.updateRole(
      {
        where: { ...args.where },
        data: { ...args.data },
      },
      info,
    );
  }

  @Mutation('deleteRole')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteRole(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    const roleExist = await this.prisma.exists.Role({ id: args.where.id });

    if (!roleExist) {
      throw new ApolloError(`Role not found`);
    }

    return await this.prisma.mutation.deleteRole(
      {
        where: { ...args.where },
      },
      info,
    );
  }

  @Mutation('deleteManyRoles')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async deleteManyRoles(
    @Args() args: any,
    @Info() info: GraphQLResolveInfo,
  ): Promise<any> {
    return await this.prisma.mutation.deleteManyRoles(
      {
        where: { ...args.where },
      },
      info,
    );
  }
}
